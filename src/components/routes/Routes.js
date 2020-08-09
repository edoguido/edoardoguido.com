import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Constants
import { ROUTE_SCROLLTOP_TIMEOUT } from '../../const/const'

// Routes
import { Home } from './home/Home'
import { Project } from './project/Project'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

export const Routes = inject('state')(
  observer(({ state }) => {
    const { state: appState, projects, fetchHero, fetchProjects } = state
    const location = useLocation()

    useEffect(() => {
      fetchHero()
      fetchProjects()
    }, []) // eslint-disable-line

    useEffect(() => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, ROUTE_SCROLLTOP_TIMEOUT)
    }, [location.pathname])

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
