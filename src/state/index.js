import { types as t, flow } from 'mobx-state-tree'
import { PRISMIC, CLIENT, DEFAULT_LANGUAGE } from '../const/const'

function getBrowserLanguage() {
  return navigator.language
}

function fetchContentsByType(type, langCode = DEFAULT_LANGUAGE, options = {}) {
  const response = CLIENT.query(PRISMIC.Predicates.at('document.type', type), {
    lang: langCode,
    ...options,
  })
  return response
}

export const State = t
  .model('State', {
    state: t.optional(t.string, 'done'),
    lang: t.optional(t.string, getBrowserLanguage()),
    hero: t.optional(t.frozen()),
    projects: t.optional(t.maybeNull(t.array(t.frozen()))),
    currentProjectUid: t.maybeNull(t.string),
  })
  .actions((self) => {
    const fetchHero = flow(function* () {
      self.state = 'pending'
      let response

      try {
        response = yield fetchContentsByType('homepage', self.lang)
        if (response.results.length === 0) {
          response = yield fetchContentsByType('homepage')
        }
      } catch (error) {
        console.error('Failed to fetch data', error)
        response = undefined
        self.state = 'error'
      }

      self.hero = response.results[0]
      self.state = 'done'

      return response
    })
    const fetchProjects = flow(function* () {
      self.state = 'pending'
      const results = []
      try {
        let response = yield fetchContentsByType('project', self.lang, {
          orderings: '[my.project.order desc]',
        })
        if (response.results.length === 0) {
          response = yield fetchContentsByType('project', null, {
            orderings: '[my.project.order desc]',
          })
        }
        for (let result of response.results) {
          results.push(result)
        }
        self.projects = results
        self.state = 'done'
      } catch (error) {
        console.error('Failed to fetch projects', error)
        self.projects = []
        self.state = 'error'
      }

      return results.length
    })

    function setCurrentProjectUid(path) {
      self.currentProjectUid = path
      return path
    }

    return { setCurrentProjectUid, fetchHero, fetchProjects }
  })
  .views((self) => {
    return {
      get currentProjectIndex() {
        if (self.projects !== null) {
          const index = self.projects.findIndex(
            (project) => project.uid === self.currentProjectUid
          )
          return index
        } else {
          const index = -1
          return index
        }
      },
      get projectIndices() {
        if (self.projects) {
          const currIndex = self.currentProjectIndex
          const prevIndex = currIndex === 0 ? null : currIndex - 1
          const nextIndex =
            currIndex === self.projects.length - 1 ? null : currIndex + 1
          return [prevIndex, currIndex, nextIndex]
        } else {
          return [undefined, undefined, undefined]
        }
      },
    }
  })
