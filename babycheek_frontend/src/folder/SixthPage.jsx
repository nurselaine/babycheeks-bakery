import React, { useEffect, useState } from "react";
import './Page.css';

const SixthPage = ({bg_image, mbg_image}) => {
  const [largeScreen, setLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 700){
        setLargeScreen(true);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [largeScreen])
  return (
    <div className="background">
      <img
        className='page_image'
        alt='cookie_background'
        src={largeScreen ? bg_image : mbg_image}
      />
    </div>
  )
}

export default SixthPage;