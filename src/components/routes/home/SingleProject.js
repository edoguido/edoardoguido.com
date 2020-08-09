import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

const ENTER_DELAY = 0.5
const EXIT_DELAY = 0.35
const transition = { type: 'spring', stiffness: 200, damping: 90 }

export const SingleProject = inject('state')(
  observer(({ state: { lang }, content, isFeatured }) => {
    const { data: slice } = content

    let variant
    if (isFeatured) {
      variant = {
        initial: { opacity: 0, y: 100, transition },
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
    } else {
      variant = {
        initial: (i) => ({
          opacity: 0,
          x: i % 2 === 0 ? 100 : -100,
          transition,
        }),
        enter: {
          opacity: 1,
          x: 0,
          transition: { ...transition, delay: ENTER_DELAY },
        },
        exit: (i) => ({
          opacity: 0,
          x: i % 2 === 0 ? 100 : -100,
          transition: { ...transition, delay: EXIT_DELAY },
        }),
      }
    }

    const localeOptions = {
      month: 'short',
      year: 'numeric',
    }
    const startDate = new Date(slice.start_date).toLocaleString(
      lang,
      localeOptions
    )
    const endDate = new Date(slice.end_date).toLocaleString(lang, localeOptions)

    return (
      <motion.div
        key={slice.uid}
        // ref={(el) => (ref.current = el)}
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
            <div className="main-info">
              <div className="caption">{slice.headline[0].text}</div>
              <h2 className="title">{slice.title[0].text}</h2>
            </div>
            <div className="duration">
              {startDate} → {endDate}
            </div>
          </div>
        </Link>
      </motion.div>
    )
  })
)
