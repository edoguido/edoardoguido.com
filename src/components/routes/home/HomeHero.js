import React from 'react'
import { RichText } from 'prismic-reactjs'
import { motion } from 'framer-motion'

// Constants
import { TRANSITION_PROPS } from '../../../const/const'

const titleSpanItem = {
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
          exit: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {content.map((slice, i) => {
          return (
            <motion.div key={i} variants={titleSpanItem}>
              <RichText render={[slice]} />
            </motion.div>
          )
        })}
      </motion.div>
    </>
  )
}
