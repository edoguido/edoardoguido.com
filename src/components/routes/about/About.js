import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { motion } from 'framer-motion'
import { RichText } from 'prismic-reactjs'

// Ext
import { Hero } from '../../Hero'
import { formatDate } from '../../../lib/utils'
import { TRANSITION_PROPS } from '../../../const/const'
import './About.css'

const variants = {
  initial: {
    opacity: 0,
    y: 20,
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
    y: 50,
    // skewY: 4,
    transition: TRANSITION_PROPS.exit,
  },
}

const About = inject('state')(
  observer(({ state }) => {
    const { lang, about, fetchAbout } = state

    useEffect(() => {
      fetchAbout()
    }, []) // eslint-disable-line

    const hasCaption = Boolean(about?.data.image.alt)

    return (
      about &&
      about.data && (
        <>
          <motion.div className="about hero">
            <Hero content={about.data.title} />
          </motion.div>
          <motion.div
            className="about-main"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              enter: {
                transition: { staggerChildren: 0.25 },
              },
              exit: {
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            <motion.div className="experiences-section" variants={variants}>
              <h3>Experiences</h3>
              <div className="experiences">
                {about.data.body.map((slice, i) => {
                  return (
                    <ul key={i} className={slice.slice_type}>
                      {slice.primary.link.url ? (
                        <a
                          className="studio-name external-link"
                          href={slice.primary.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{slice.primary.studio[0].text}</span>
                        </a>
                      ) : (
                        <p className="studio-name">
                          {slice.primary.studio[0].text}
                        </p>
                      )}
                      {slice.items.map((experience, i) => {
                        return (
                          <ul key={i} className="position">
                            <RichText render={experience.position} />
                            <div className="period faded">
                              <span>{formatDate(experience.from, lang)}</span>
                              <span> → </span>
                              <span>{formatDate(experience.to, lang)}</span>
                            </div>
                          </ul>
                        )
                      })}
                    </ul>
                  )
                })}
              </div>
            </motion.div>

            <motion.div className="about-main-section" variants={variants}>
              <h3>Bio</h3>
              <motion.div className="about-main-text">
                {about.data.text.map((slice, i) => {
                  return <p key={i}>{slice.text}</p>
                })}
              </motion.div>
            </motion.div>
            <motion.div
              className="image-container"
              style={{ maxWidth: about.data.image.dimensions.width }}
              variants={variants}
            >
              <img
                src={about.data.image.url}
                height={about.data.image.dimensions.height}
                alt={about.data.image.alt}
              />
              {hasCaption && <figcaption>{about.data.image.alt}</figcaption>}
            </motion.div>
          </motion.div>
        </>
      )
    )
  })
)

export default About
