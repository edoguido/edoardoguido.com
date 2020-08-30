import { types as t, flow } from 'mobx-state-tree'
import { PRISMIC, CLIENT, DEFAULT_LANGUAGE } from '../const/const'

function getBrowserLanguage() {
  return navigator.language
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
        response = yield CLIENT.query(
          PRISMIC.Predicates.at('document.type', 'homepage'),
          {
            lang: self.lang,
          }
        )
        if (response.results.length === 0) {
          response = yield CLIENT.query(
            PRISMIC.Predicates.at('document.type', 'homepage'),
            {
              lang: DEFAULT_LANGUAGE,
            }
          )
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
        let response = yield CLIENT.query(
          PRISMIC.Predicates.at('document.type', 'project'),
          {
            orderings: '[my.project.order]',
            lang: self.lang,
          }
        )
        if (response.results.length === 0) {
          response = yield CLIENT.query(
            PRISMIC.Predicates.at('document.type', 'project'),
            {
              orderings: '[my.project.order]',
              lang: DEFAULT_LANGUAGE,
            }
          )
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
