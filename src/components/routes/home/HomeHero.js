import React from 'react'
import { RichText } from 'prismic-reactjs'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const transition = { type: 'spring', stiffness: 200, damping: 90 }

const titleSpanItem = {
  initial: { opacity: 0, y: 100, transition },
  enter: { opacity: 1, y: 0, transition },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 1.5, ...transition },
  },
}

export const HomeHero = ({ content }) => {
  return (
    <>
      <motion.div
        className="hero"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{
          enter: { transition: { staggerChildren: 0.1 } },
          exit: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {content.map((slice, i) => {
          return (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div key={i} variants={titleSpanItem}>
                <RichText render={[slice]} />
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </>
  )
}
