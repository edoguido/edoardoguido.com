import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { RichText } from 'prismic-reactjs'
import { motion } from 'framer-motion'
import './Project.css'

// Constants
import { TRANSITION_PROPS } from '../../../const/const'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const EXIT_DELAY = 0.25

const variants = {
  initial: {
    opacity: 0,
    y: 30,
    transition: TRANSITION_PROPS.enter,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_PROPS.enter,
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: TRANSITION_PROPS.exit,
  },
}

const contentVariants = {
  initial: {
    opacity: 0,
    y: 30,
    transition: {
      ...TRANSITION_PROPS.enter,
      delay: EXIT_DELAY,
    },
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      ...TRANSITION_PROPS.enter,
      delay: EXIT_DELAY,
    },
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: {
      ...TRANSITION_PROPS.exit,
      delay: EXIT_DELAY,
    },
  },
}

const sharedProps = {
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants: {
    enter: { transition: { staggerChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.05 } },
  },
}

const ExternalLinkImage = (props) => {
  const {
    data: { primary },
  } = props
  return (
    <div className="external-link-image">
      <a href={primary.link.url} target={primary.link.target}>
        <img src={primary.image.url} alt="" width="100%" />
        <figcaption>{primary.caption[0].text}</figcaption>
      </a>
    </div>
  )
}

function sliceSwitcher(slice, sliceType, key) {
  // console.log(slice)

  const types = {
    image_with_link: <ExternalLinkImage key={key} data={slice} />,
  }

  return types[sliceType]
}

export const Project = inject('state')(
  observer(({ state, match }) => {
    const { id } = match.params
    const {
      projects,
      setCurrentProjectUid,
      currentProjectIndex,
      projectIndices,
    } = state

    const location = useLocation()

    useEffect(() => {
      setCurrentProjectUid(id)
    }, [location.pathname])

    // const nextIndex = nextProjectIndex(id)
    // const previousIndex = previousProjectIndex(id)
    // console.log(previousIndex)

    const projectData = projects[currentProjectIndex]?.data

    return (
      projectData && (
        <>
          <motion.div className="project-hero" {...sharedProps}>
            <motion.div className="project-meta" variants={variants}>
              <h1>{projectData.name}</h1>
              <span>{projectData.title[0].text}</span>
            </motion.div>
            <motion.div className="project-info">
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
            </motion.div>
          </motion.div>
          <motion.div className="project-content" {...sharedProps}>
            {projectData.content.map((slice, i) => {
              return (
                <motion.div
                  key={i}
                  className="section"
                  variants={contentVariants}
                >
                  {sliceSwitcher(slice, slice.slice_type, i)}
                </motion.div>
              )
            })}
          </motion.div>
          <motion.div className="project-selector" {...sharedProps}>
            <motion.div
              className="selector previous"
              variants={contentVariants}
            >
              {projectIndices[0] !== null && (
                <Link to={`/project/${projects[projectIndices[0]].uid}`}>
                  <span>Previous Project</span>
                  <h2>{projects[projectIndices[0]].uid}</h2>
                </Link>
              )}
            </motion.div>
            <motion.div className="selector next" variants={contentVariants}>
              {projectIndices[2] && (
                <Link to={`/project/${projects[projectIndices[2]].uid}`}>
                  <span>Next Project</span>
                  <h2>{projects[projectIndices[2]].uid}</h2>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </>
      )
    )
  })
)
