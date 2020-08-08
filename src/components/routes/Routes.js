import React, { useState } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion'

// Routes
import { Home } from './home/Home'
import { Project } from './project/Project'

export const Routes = () => {
  const [scrollHeight, setScrollHeight] = useState(0)
  const { scrollY } = useViewportScroll()
  const yRange = useTransform(scrollY, [0, scrollHeight], [0, -scrollHeight])
  const translateY = useSpring(yRange, {
    type: 'spring',
    stiffness: 300,
    damping: 90,
  })

  return (
    <motion.div className="wrapper" style={{ translateY }}>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/project">
                <Redirect to="/project/0" />
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
}
