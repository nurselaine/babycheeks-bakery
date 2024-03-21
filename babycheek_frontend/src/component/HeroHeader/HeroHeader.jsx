import React, { useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroHeader = ({item_id}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const itemData = useSelector(state => state.menuItems.find(item => item.item_id === item_id));

  useEffect(() => {
    if (isInView) {
      mainControls.start("animateState");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="menu_header">
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
          <h1 className="header-title">{itemData.item_name}</h1>
          <h4 className="header-description">
            {itemData.item_description}
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
