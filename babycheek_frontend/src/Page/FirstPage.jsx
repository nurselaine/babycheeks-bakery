import React, { useEffect, useState } from "react";
import './Page.css';
import HeroHeader from "../component/HeroHeader/HeroHeader";

const FirstPage = ({ bg_image, mbg_image }) => {
  const [largeScreen, setLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 700){
        setLargeScreen(true);
      } else {
        setLargeScreen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [largeScreen])

  return (
    <div className="background" style={{backgroundImage: `url(${largeScreen ? bg_image : mbg_image})`}}>
      <section className="header">
      <HeroHeader />
      </section>
    </div>
  )
}

export default FirstPage;