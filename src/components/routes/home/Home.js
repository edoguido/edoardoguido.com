import React from 'react'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

// Components
import { Hero } from '../../Hero.js'
import { SingleProject } from './SingleProject.js'

// Style
import './Home.css'

export const Home = inject('state')(
  observer(({ state: { projects, hero } }) => {
    return (
      <>
        {hero && (
          <motion.div className="home hero">
            <Hero content={hero.data.hero_text} />
          </motion.div>
        )}
        {projects && (
          <motion.div
            className="all-projects"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              enter: { transition: { staggerChildren: 0.1 } },
              exit: { transition: { staggerChildren: 0.05 } },
            }}
          >
            <div className="projects-list">
              {projects.length > 0 &&
                projects.map((data, i) => {
                  return <SingleProject key={i} custom={i} content={data} />
                })}
            </div>
          </motion.div>
        )}
      </>
    )
  })
)
