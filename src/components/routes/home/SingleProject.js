import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

// Ext
import { VideoElement } from '../../VideoElement'
// import { formatDate } from '../../../lib/utils'
import { TRANSITION_PROPS } from '../../../const/const'

const ENTER_DELAY = 0.2
const EXIT_DELAY = 0.1

const variant = {
  initial: (i) => ({
    opacity: 0,
    y: 60,
    transition: { ...TRANSITION_PROPS.enter, delay: i * ENTER_DELAY },
  }),
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: { ...TRANSITION_PROPS.enter, delay: i * ENTER_DELAY },
  }),
  exit: (i) => ({
    opacity: 0,
    y: 60,
    transition: { ...TRANSITION_PROPS.exit, delay: i * EXIT_DELAY },
  }),
}

export const SingleProject = inject('state')(
  observer(({ custom, content, isFeatured }) => {
    const { data: slice } = content

    // const startDate = formatDate(slice.start_date, lang)
    // const endDate = formatDate(slice.end_date, lang)

    return (
      <motion.div
        key={slice.uid}
        custom={custom}
        className={`project ${isFeatured ? 'featured' : ''}`}
        style={{
          gridColumn: `span ${slice?.grid_span ? slice?.grid_span : 4}`,
        }}
        variants={variant}
      >
        <Link to={`/p/${content.uid}`}>
          <div className="cover">
            {slice.is_cover_animated ? (
              <>
                <VideoElement
                  url={slice.cover.url}
                  poster={slice.cover_fallback.url}
                  filename={slice.cover.name}
                  plays={true}
                  fit={'cover'}
                />
                <div className="shadow">
                  <VideoElement
                    className="shadow-content"
                    url={slice.cover.url}
                    poster={slice.cover_fallback.url}
                    filename={slice.cover.name}
                    plays={true}
                    fit={'cover'}
                  />
                </div>
              </>
            ) : (
              <>
                <img src={slice.cover_fallback.url} alt={slice.uid} />
                <div className="shadow">
                  <img src={slice.cover_fallback.url} alt={slice.uid} />
                </div>
              </>
            )}
            {/* <img src={slice.cover_fallback.url} alt={slice.alt} /> */}
          </div>
          <div className="info">
            <div className="left">
              <span className="faded caption">{slice.headline[0].text}</span>
              <span className="faded duration">
                {slice.wip ? (
                  <>
                    Work In Progress <div className="wip" />
                  </>
                ) : (
                  <>{/* `${startDate} → ${endDate}` */}</>
                )}
              </span>
            </div>
            <div className="right">
              <h2 className="title">{slice.title[0].text}</h2>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  })
)
