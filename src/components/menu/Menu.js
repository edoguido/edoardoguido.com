import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { inject, observer } from 'mobx-react'
import { Link, useLocation } from 'react-router-dom'

import { TRANSITION_EASE_IN, TRANSITION_EASE_OUT } from '../../const/const'

// Styles
import './Menu.css'

const parentVariant = {
  initial: {
    x: '100%',
    transition: {
      duration: 1,
      ease: [0.85, 0, 0, 0.15],
    },
  },
  visible: {
    x: '0%',
    transition: {
      when: 'beforeChildren',
      duration: 0.5,
      ease: [0.5, 0, 0, 1],
    },
  },
  hidden: {
    x: '200%',
    transition: {
      duration: 1,
      ease: [0.85, 0, 0, 0.15],
    },
  },
}

const overlayVariant = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: TRANSITION_EASE_IN,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: TRANSITION_EASE_IN,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: TRANSITION_EASE_OUT,
    },
  },
}

const variants = {
  initial: {
    opacity: 0,
    x: '10%',
    transition: { duration: 0.25, ease: TRANSITION_EASE_IN },
  },
  visible: (i) => ({
    opacity: 1,
    x: '0%',
    transition: { duration: 0.25, delay: i * 0.05, ease: TRANSITION_EASE_IN },
  }),
  hidden: (i) => ({
    opacity: 0,
    x: '10%',
    transition: { duration: 0.25, delay: i * 0.05, ease: TRANSITION_EASE_OUT },
  }),
}

export const Menu = inject('state')(
  observer(({ state: { projects, currentProjectUid } }) => {
    const [open, toggleOpen] = useState(false)
    const overlayRef = useRef(null)

    const location = useLocation()

    function handleClick() {
      toggleOpen((prev) => {
        prev
          ? (document.body.style.overflow = '')
          : (document.body.style.overflow = 'hidden')

        return !prev
      })
    }

    useEffect(() => {
      window.addEventListener('click', (e) => {
        const target = e.target
        if (target.contains(overlayRef.current)) handleClick()
      })
    }, [])

    return (
      <>
        <div
          className={`menu-button ${open ? 'open' : ''}`}
          onClick={handleClick}
        />
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                ref={overlayRef}
                className="menu-overlay"
                initial="initial"
                animate="visible"
                exit="hidden"
                variants={overlayVariant}
              />
              <motion.div
                className="menu"
                initial="initial"
                animate="visible"
                exit="hidden"
                variants={parentVariant}
              >
                <motion.div className="menu-content">
                  <motion.div className="menu-section">
                    <motion.div
                      custom={0}
                      className="menu-title"
                      variants={variants}
                    >
                      <Link to="/" onClick={handleClick}>
                        Homepage
                      </Link>
                    </motion.div>
                    <motion.div
                      custom={1}
                      className="menu-title"
                      variants={variants}
                    >
                      <Link to="/about" onClick={handleClick}>
                        About
                      </Link>
                    </motion.div>
                  </motion.div>
                  <motion.div className="menu-section">
                    <motion.div
                      custom={2}
                      className="menu-title"
                      variants={variants}
                    >
                      Projects ↘
                    </motion.div>
                    {projects &&
                      projects.map((project, i) => {
                        const { data } = project
                        const isCurrentProjectPage =
                          location.pathname.split('/')[2] &&
                          location.pathname.split('/')[2] === project.uid
                        return (
                          <motion.div
                            key={i}
                            className={`menu-project ${
                              isCurrentProjectPage ? 'current' : ''
                            }`}
                            custom={i + 3}
                            variants={variants}
                          >
                            <Link
                              to={`/p/${project.uid}`}
                              onClick={handleClick}
                            >
                              {data.name}
                            </Link>
                          </motion.div>
                        )
                      })}
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  })
)
