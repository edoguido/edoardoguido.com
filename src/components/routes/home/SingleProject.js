import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const enterDelay = 0.5
const exitDelay = 0.35
const transition = { type: 'spring', stiffness: 200, damping: 90 }

export const SingleProject = ({ content, isFeatured }) => {
  const {
    data: { data: slice },
    ref,
  } = content

  let variant
  if (isFeatured) {
    variant = {
      initial: { opacity: 0, y: 100, transition },
      enter: {
        opacity: 1,
        y: 0,
        transition: { ...transition, delay: enterDelay },
      },
      exit: {
        opacity: 0,
        y: -100,
        transition: { ...transition, delay: exitDelay },
      },
    }
  } else {
    variant = {
      initial: (i) => ({ opacity: 0, x: i % 2 === 0 ? 100 : -100, transition }),
      enter: {
        opacity: 1,
        x: 0,
        transition: { ...transition, delay: enterDelay },
      },
      exit: (i) => ({
        opacity: 0,
        x: i % 2 === 0 ? 100 : -100,
        transition: { ...transition, delay: exitDelay },
      }),
    }
  }

  return (
    <motion.div
      key={slice.uid}
      ref={(el) => (ref.current = el)}
      className={`${isFeatured ? 'featured' : ''} project`}
      variants={variant}
    >
      <Link to={`/project/${slice.uid}`}>
        <div className="cover">
          {slice.is_cover_animated ? (
            <video muted loop autoPlay>
              <source
                src={slice.cover.url}
                type={`video/${slice.cover.name.split('.')[1]}`}
              />
            </video>
          ) : (
            <img src={slice.cover.url} alt={slice.alt} />
          )}
        </div>
        <div className="info">
          <div className="caption">{slice.headline[0].text}</div>
          <h2 className="title">{slice.title[0].text}</h2>
        </div>
      </Link>
    </motion.div>
  )
}
