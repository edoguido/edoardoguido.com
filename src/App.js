import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from 'framer-motion'

// Components
import { Nav } from './components/Nav'

// Routes
import { Home } from './components/routes/home/Home'
import { Project } from './components/routes/project/Project'

function App() {
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
  }, [scrollHeight])

  useEffect(() => {
    const handleResize = () => {
      setScrollHeight(scrollRef.current.children[0].offsetHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Router>
        <Nav />
        <motion.div className="scroller" ref={scrollRef}>
          <motion.div className="wrapper" style={{ translateY }}>
            <Switch>
              <Route exact path="/project">
                <Redirect to="/project/antani" />
              </Route>
              <Route path="/project/:id" component={Project} />
              <Route exact path="/" component={Home} />
              <Route>Page not found!</Route>
            </Switch>
          </motion.div>
        </motion.div>
      </Router>
    </>
  )
}

export default App
