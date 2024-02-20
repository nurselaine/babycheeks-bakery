import React, { useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import "../../Page/Page.css";
import { Link } from "react-router-dom";

const HeroHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animateState");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <AnimatePresence mode={"wait"}>
        <motion.div
          variants={{
            initialState: {
              opacity: 0,
              x: -100,
            },
            animateState: {
              opacity: 1,
              x: 0,
            },
          }}
          animate={mainControls}
          initial="initialState"
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
        >
          <h1 className="header-title">Cookie Name</h1>
          <h4 className="header-description">
            Yummy yummy delicious cookie description lalalala.
          </h4>
          <Link to='/checkout'>
            <button className="order-btn">ORDER NOW</button>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroHeader;
