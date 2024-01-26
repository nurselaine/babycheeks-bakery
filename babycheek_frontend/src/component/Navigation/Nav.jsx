import React from "react";
import { 
  BrowserRouter,
  Route,
  Link 
} from "react-router-dom";
import { motion } from "framer-motion";
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav">
      <Link to='/' className="nav-container">
        <img 
          src='./assets/bbb_logo.png'
          alt='bakery_logo'
          className="logo nav-icon"
        />
        <p className="logoname">Babycheeks Bakery</p>
      </Link>
      <motion.button 
        whileHover={{scale: 1.1}}
        whileTap={{ scale: 0.9 }}
        style={{background: 'transparent', border: 'none'}}
      >
        <Link to='/checkout'>
          <img 
              src='./assets/checkout/shopping-cart.png'
              alt='shopping cart'
              className="checkout-icon nav-icon"
            />
        </Link>
      </motion.button>
    </div>
  )
}

export default Nav;