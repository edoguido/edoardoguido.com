import React, { useEffect, useState } from 'react'
import { PRISMIC, CLIENT } from '../../../const/const.js'
import { motion } from 'framer-motion'

// Components
import { HomeHero } from './HomeHero.js'

// Style
import './Home.css'
import { SingleProject } from './SingleProject.js'

const lang = 'en-gb'

export const Home = () => {
  const [content, setContent] = useState(null)
  const [projects, setProjects] = useState(null)

  // const [activeProj, setActiveProj] = useState({
  //   index: null,
  //   last: null,
  // })

  useEffect(() => {
    const fetchHeroData = async () => {
      const response = await CLIENT.getByUID('homepage', 'home', {
        lang,
      })
      if (response) setContent(response)
    }
    fetchHeroData()

    const fetchProjectData = async () => {
      const response = await CLIENT.query(
        PRISMIC.Predicates.at('document.type', 'project'),
        {
          orderings: '[my.project.order]',
          lang,
        }
      )
      if (response) {
        const results = []
        for (let result of response.results) {
          results.push({ data: result, ref: React.createRef() })
        }
        setProjects(results)
      }
    }
    fetchProjectData()
  }, [])

  // function handleScroll() {
  //   if (projList) {
  //     const { innerHeight } = window
  //     const { scrollTop } = document.documentElement
  //     const scrollTrigger = scrollTop + innerHeight / 2

  //     if (scrollTrigger < projList[0].ref.current.offsetTop)
  //       setActiveProj((prev) => {
  //         return {
  //           index: null,
  //           last: prev.index,
  //         }
  //       })

  //     // console.log(scrollTop, innerHeight)

  //     for (let proj of projList) {
  //       const {
  //         id,
  //         ref: { current },
  //       } = proj
  //       const { offsetTop, offsetHeight } = current
  //       const offsetBottom = offsetTop + offsetHeight

  //       if (scrollTrigger > offsetTop && scrollTrigger < offsetBottom)
  //         setActiveProj((prev) => {
  //           if (prev.index !== id) {
  //             return {
  //               index: id,
  //               last: prev.index,
  //             }
  //           } else return prev
  //         })
  //     }
  //   }
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [projList])

  return (
    <>
      {content && <HomeHero content={content.data.hero_text} />}
      {projects && (
        <motion.div
          className="all-projects"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            enter: { transition: { staggerChildren: 0.1 } },
            exit: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {projects && projects[0] && (
            <SingleProject content={projects[0]} isFeatured />
          )}
          <div className="projects-list">
            {projects.length > 1 &&
              projects.slice(1, projects.length).map((data, i) => {
                return <SingleProject key={i} content={data} />
              })}
          </div>
        </motion.div>
      )}
    </>
  )
}
