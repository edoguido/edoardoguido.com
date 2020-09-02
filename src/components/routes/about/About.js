import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'

// Styles
import './About.css'

// Const
import { CLIENT, PRISMIC, TRANSITION_PROPS } from '../../../const/const'
import { Hero } from '../../Hero'

const variants = {
  initial: {
    opacity: 0,
    y: -10,
    // skewY: -4,
    transition: TRANSITION_PROPS.enter,
  },
  enter: {
    opacity: 1,
    y: 0,
    // skewY: 0,
    transition: TRANSITION_PROPS.enter,
  },
  exit: {
    opacity: 0,
    y: -50,
    // skewY: 4,
    transition: TRANSITION_PROPS.exit,
  },
}

export const About = inject('state')(
  observer((state) => {
    const { lang } = state

    const [pageData, setPageData] = useState(null)

    useEffect(() => {
      CLIENT.query(PRISMIC.Predicates.at('document.type', 'about'), {
        lang: lang,
      }).then((d) => {
        if (d) {
          setPageData(d.results[0])
        }
      })
    }, [pageData])

    const hasCaption = Boolean(pageData?.data.image.alt)

    return (
      pageData && (
        <>
          <Hero content={pageData.data.title} />
          <motion.div className="about-main">
            <motion.div
              className="about-main-text"
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {pageData.data.text.map((slice, i) => {
                return (
                  <motion.p key={i} variants={variants}>
                    {slice.text}
                  </motion.p>
                )
              })}
            </motion.div>

            <motion.div
              className="image-container"
              style={{ maxWidth: pageData.data.image.dimensions.width }}
              initial={variants.initial}
              animate={variants.enter}
              exit={variants.exit}
            >
              <img
                src={pageData.data.image.url}
                width={pageData.data.image.dimensions.width}
              />
              {hasCaption && <figcaption>{pageData.data.image.alt}</figcaption>}
            </motion.div>
          </motion.div>
        </>
      )
    )
  })
)
