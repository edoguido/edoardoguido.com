import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { motion, AnimatePresence } from 'framer-motion'

// Routes
import { Home } from './home/Home'

// Ext
import { ROUTE_SCROLLTOP_TIMEOUT } from '../../const/const'

const About = lazy(() => import('./about/About'))
const Project = lazy(() => import('./project/Project'))

export const Routes = inject('state')(
  observer(({ state }) => {
    const { fetchHero, fetchProjects, fetchAbout } = state
    const location = useLocation()

    useEffect(() => {
      fetchHero()
      fetchProjects()
      fetchAbout()
    }, []) // eslint-disable-line

    useEffect(() => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, ROUTE_SCROLLTOP_TIMEOUT)
    }, [location.pathname])

    return (
      <motion.div className="wrapper">
        <Route
          render={({ location }) => {
            return (
              <Suspense fallback={null}>
                <AnimatePresence exitBeforeEnter>
                  <Switch location={location} key={location.pathname}>
                    <Route path="/p/:id" component={Project} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route component={Home} />
                  </Switch>
                </AnimatePresence>
              </Suspense>
            )
          }}
        />
      </motion.div>
    )
  })
)
