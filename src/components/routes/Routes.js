import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { motion, AnimatePresence } from 'framer-motion'

// Routes
import { Home } from './home/Home'

const About = lazy(() => import('./about/About'))
const Project = lazy(() => import('./project/Project'))
const ProjectPreview = lazy(() => import('./project/ProjectPreview'))

export const Routes = inject('state')(
  observer(({ state }) => {
    const { fetchHero, fetchProjects, fetchAbout } = state

    useEffect(() => {
      fetchHero()
      fetchProjects()
      fetchAbout()
    }, []) // eslint-disable-line

    const handleExit = () => {
      window.scrollTo(0, 0)
    }

    return (
      <motion.div className="wrapper">
        <Route
          render={({ location }) => {
            return (
              <Suspense fallback={null}>
                <AnimatePresence exitBeforeEnter onExitComplete={handleExit}>
                  <Switch location={location} key={location.pathname}>
                    <Route path="/p/:id" component={Project} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/" component={Home} />
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
