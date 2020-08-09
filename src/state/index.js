import { types as t, flow } from 'mobx-state-tree'
import { PRISMIC, CLIENT, DEFAULT_LANGUAGE } from '../const/const'

function getBrowserLanguage() {
  return navigator.language
}

export const State = t
  .model('State', {
    state: t.optional(t.string, 'idle'),
    lang: t.optional(t.string, getBrowserLanguage()),
    projects: t.optional(t.array(t.frozen()), []),
  })
  .actions((self) => {
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

    return { fetchProjects }
  })
