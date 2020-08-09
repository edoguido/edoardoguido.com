import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { inject, observer } from 'mobx-react'
import { RichText } from 'prismic-reactjs'
import { motion } from 'framer-motion'
import './Project.css'

const ENTER_DELAY = 0
const EXIT_DELAY = 0
const transition = { type: 'spring', stiffness: 200, damping: 90 }

const variants = {
  initial: {
    opacity: 0,
    y: 100,
    transition,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { ...transition, delay: ENTER_DELAY },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { ...transition, delay: EXIT_DELAY },
  },
}

export const Project = inject('state')(
  observer(({ state, match }) => {
    const { id } = match.params
    const { projects, currentProjectIndex } = state

    const projectIndex = currentProjectIndex(id)
    const projectData = projects[projectIndex]?.data

    return (
      projectData && (
        <>
          <motion.div
            className="project-hero"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              enter: { transition: { staggerChildren: 0.1 } },
              exit: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div className="project-meta" variants={variants}>
              <h1>{projectData.name}</h1>
              <span>{projectData.title[0].text}</span>
            </motion.div>
            <div className="project-info">
              {projectData.body.map((slice, i) => {
                return (
                  <motion.div key={i} variants={variants}>
                    <RichText render={slice.primary.theme} />
                    <div>
                      <RichText render={slice.items[0].text} />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
          <div className="project-content">
            {projectData.content.map((slice, i) => {
              console.log(slice)
              return <div key={i}></div>
            })}
          </div>
        </>
      )
    )
  })
)
