import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { motion, useMotionValue } from 'framer-motion'

// Constants
import { TRANSITION_PROPS } from '../../../const/const'
import { VideoElement } from '../../VideoElement'

const localeOptions = {
  month: 'short',
  year: 'numeric',
}

const ENTER_DELAY = 0.35
const EXIT_DELAY = 0.25

const variant = {
  initial: {
    opacity: 0,
    y: 30,
    transition: { ...TRANSITION_PROPS.enter, delay: ENTER_DELAY },
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { ...TRANSITION_PROPS.enter, delay: ENTER_DELAY },
  },
  exit: {
    opacity: 0,
    y: 80,
    transition: { ...TRANSITION_PROPS.exit, delay: EXIT_DELAY },
  },
}

export const SingleProject = inject('state')(
  observer(({ state: { lang }, content, isFeatured }) => {
    const { data: slice } = content

    const startDate = new Date(slice.start_date).toLocaleString(
      lang,
      localeOptions
    )
    const endDate = new Date(slice.end_date).toLocaleString(lang, localeOptions)

    return (
      <motion.div
        key={slice.uid}
        className={`${isFeatured ? 'featured' : ''} project`}
        variants={variant}
      >
        <Link to={`/p/${content.uid}`}>
          <div className="cover">
            {slice.is_cover_animated ? (
              <>
                <VideoElement
                  url={slice.cover.url}
                  filename={slice.cover.name}
                  fit={'cover'}
                />
                <img src={slice.cover_fallback.url} alt={slice.alt} />
              </>
            ) : (
              <img src={slice.cover.url} alt={slice.alt} />
            )}
          </div>
          <div className="info">
            <div className="upper">
              <span className="faded caption">{slice.headline[0].text}</span>
              <div className="faded tags">
                {content.tags.map((tag, i) => {
                  return (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="lower">
              <h2 className="title">{slice.title[0].text}</h2>
              <span className="faded duration">
                {startDate} → {endDate}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  })
)
