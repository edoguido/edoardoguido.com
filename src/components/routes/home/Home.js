import React, { useEffect, useRef } from 'react'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

// Ext
import { Hero } from '../../Hero.js'
import { SingleProject } from './SingleProject.js'
import './Home.css'

export const Home = inject('state')(
  observer(({ state: { projects, hero } }) => {
    const ref = useRef(null)

    useEffect(() => {
      let frame

      function getActiveSections() {
        frame = window.requestAnimationFrame(getActiveSections)

        const scrollTop = window.scrollY
        const scrollBottom = scrollTop + window.innerHeight

        const covers = document.getElementsByClassName('cover')

        for (let i = 0; i < covers.length; i++) {
          const cover = covers[i]

          const videos = cover.getElementsByTagName('video')

          if (videos.length) {
            for (let j = 0; j < videos.length; j++) {
              const video = videos[j]
              const { offsetTop, offsetHeight } = cover

              if (
                scrollTop < offsetTop + offsetHeight &&
                scrollBottom > offsetTop
              ) {
                if (video.paused) {
                  video.play()
                }
              } else video.pause()
            }
          }
        }
      }

      getActiveSections()

      return () => {
        window.cancelAnimationFrame(frame)
      }
    }, [])

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
              exit: { transition: { staggerChildren: 0.5 } },
            }}
          >
            <div ref={ref} className="projects-list">
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
