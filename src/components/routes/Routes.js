import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
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
  const location = useLocation()
  const scrollRef = useRef(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const { scrollY } = useViewportScroll()
  const yRange = useTransform(scrollY, [0, scrollHeight], [0, -scrollHeight])
  const translateY = useSpring(yRange, { stiffness: 300, damping: 90 })

  useLayoutEffect(() => {
    setTimeout(() => {
      const { children, style } = scrollRef.current
      style.height = `${children[0].offsetHeight}px`
      setScrollHeight(children[0].offsetHeight)
    }, 100)
  }, [scrollHeight, location.pathname])

  useEffect(() => {
    const handleResize = () =>
      setScrollHeight(scrollRef.current.children[0].offsetHeight)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // useEffect(() => {
  //   document.documentElement.scroll(0, 0)
  // }, [location.pathname])

  return (
    <motion.div className="scroller" ref={scrollRef}>
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
    </motion.div>
  )
}
