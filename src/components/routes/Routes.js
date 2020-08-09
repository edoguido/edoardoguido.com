import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Routes
import { Home } from './home/Home'
import { Project } from './project/Project'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

export const Routes = inject('state')(
  observer(({ state }) => {
    const { projects, fetchHero, fetchProjects } = state

    useEffect(() => {
      fetchHero()
      fetchProjects()
    }, []) // eslint-disable-line

    return (
      <motion.div className="wrapper">
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/project">
                  <Redirect to={`/project/hate-shades`} />
                </Route>
                <Route path="/project/:id" component={Project} />
                <Route exact path="/" component={Home} />
                <Route>Page not found!</Route>
              </Switch>
            </AnimatePresence>
          )}
        />
      </motion.div>
    )
  })
)
