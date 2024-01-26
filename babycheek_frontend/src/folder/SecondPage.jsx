import React,{useState, useEffect} from "react";
import HeroHeader from "../component/HeroHeader/HeroHeader";
import './Page.css';

const SecondPage = ({bg_image, mbg_image}) => {
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

export default SecondPage;