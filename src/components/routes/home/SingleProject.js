import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

import { VideoElement } from '../../VideoElement'
import { formatDate } from '../../../lib/utils'
import { TRANSITION_PROPS } from '../../../const/const'

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

    const startDate = formatDate(slice.start_date, lang)
    const endDate = formatDate(slice.end_date, lang)

    return (
      <motion.div
        key={slice.uid}
        className={`${isFeatured ? 'featured' : ''} project`}
        variants={variant}
      >
        <Link to={`/p/${content.uid}`}>
          <div className="cover">
            {slice.is_cover_animated && (
              <VideoElement
                url={slice.cover.url}
                poster={slice.cover_fallback.url}
                filename={slice.cover.name}
                fit={'cover'}
              />
            )}
            {/* <img src={slice.cover_fallback.url} alt={slice.alt} /> */}
          </div>
          <div className="info">
            <div className="left">
              <span className="faded caption">{slice.headline[0].text}</span>
              <div className="faded tags">
                {content.tags.map((tag, i, arr) => {
                  const isLast = i === arr.length - 1
                  return (
                    <React.Fragment key={i}>
                      <span className="tag">{tag}</span>
                      {!isLast && ' — '}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
            <div className="right">
              <h2 className="title">{slice.title[0].text}</h2>
              <span className="faded duration">
                {slice.wip ? (
                  <>
                    Work In Progress <div className="wip" />
                  </>
                ) : (
                  `${startDate} → ${endDate}`
                )}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  })
)
