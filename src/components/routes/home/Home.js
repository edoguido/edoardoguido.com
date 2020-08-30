import React from 'react'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

// Components
import { HomeHero } from './HomeHero.js'
import { SingleProject } from './SingleProject.js'

// Style
import './Home.css'

export const Home = inject('state')(
  observer(({ state: { projects, hero } }) => {
    // const [activeProj, setActiveProj] = useState({
    //   index: null,
    //   last: null,
    // })

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
        {hero && <HomeHero content={hero.data.hero_text} />}
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
  })
)
