import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../../Page/Page.css';

const HeroHeader = () => {
  return (
    <AnimatePresence
      mode={'wait'}
    >
      <motion.div
        initial='initialState'
        animate='animateState'
        exit='exitState'
        transition={{
          type: 'tween',
          duration: 0.5
        }}
        variants={{
          initialState: {
            opacity: 0
          },
          animateState: {
            opacity: 1
          },
          exitState: {
            opacity: 0
          }
        }}
      >

      <h1 className="header-title">Cookie Name</h1>
      <h4 className="header-description">Yummy yummy delicious cookie description lalalala.</h4>
      <button className="order-btn">
        ORDER NOW
      </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default HeroHeader;