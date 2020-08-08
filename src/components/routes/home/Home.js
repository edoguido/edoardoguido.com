import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CLIENT } from '../../../const/const.js'
import { motion } from 'framer-motion'

// Components
import { HomeHero } from './HomeHero.js'

// Style
import './Home.css'

const projsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export const Home = () => {
  const [content, setContent] = useState(null)
  const [projList, setProjList] = useState(null)
  // const [activeProj, setActiveProj] = useState({
  //   index: null,
  //   last: null,
  // })

  useEffect(() => {
    const fetchHeroData = async () => {
      const response = await CLIENT.getByUID('homepage', 'home', {
        lang: 'en-gb',
      })
      if (response) setContent(response)
    }
    fetchHeroData()

    setProjList(
      projsArray.map((id) => ({
        id,
        ref: React.createRef(),
      }))
    )
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

  const transition = { type: 'spring', stiffness: 200, damping: 90 }

  const projectsListVariants = {
    initial: { opacity: 0, y: 100, transition },
    enter: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: -100, transition },
  }

  return (
    <>
      {content && <HomeHero content={content.data.hero_text} />}
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
        {projList && (
          <motion.div
            key={projList[0].id}
            ref={(el) => (projList[0].ref.current = el)}
            className="featured project"
            variants={projectsListVariants}
          >
            <Link to={`/project/${projList[0].id}`}>
              <div className="cover">
                <img
                  src={`https://picsum.photos/seed/${
                    projList[0].id + 40
                  }/2560/1800`}
                  alt=""
                />
              </div>
              <div className="info">
                <div className="caption">A beautiful caption</div>
                <h2 className="title">
                  The wonderful project number {projList[0].id}
                </h2>
              </div>
            </Link>
          </motion.div>
        )}
        <div className="projects-list">
          {projList &&
            projList.slice(1, projList.length).map(({ id, ref }) => {
              return (
                <motion.div
                  key={id}
                  ref={(el) => (ref.current = el)}
                  className="project"
                  variants={projectsListVariants}
                >
                  <Link to={`/project/${id}`}>
                    <div className="cover">
                      <img
                        src={`https://picsum.photos/seed/${id + 40}/2560/1800`}
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <div className="caption">A beautiful caption</div>
                      <h2 className="title">
                        The wonderful project number {id}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
        </div>
      </motion.div>
    </>
  )
}
