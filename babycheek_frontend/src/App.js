import React, { useState } from 'react';
import ReactPageScroller from 'react-page-scroller';
import FirstPage from './folder/FirstPage';
import SecondPage from './folder/SecondPage';
import ThirdPage from './folder/ThirdPage';
import FourthPage from './folder/FourthPage';
import FifthPage from './folder/FifthPage';
import SixthPage from './folder/SixthPage';
import hero_bg from './utils/home_data.json';
import './App.css';

const App = () => {
  const [page, setPage] = useState(null);

  const handlePageChange = number => {
    setPage(number);
  }


  return (
    <div id='App'>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={page}
      >
        <FirstPage bg_image={hero_bg.bg[0]} mbg_image={hero_bg.mbg[0]}/>
        <SecondPage bg_image={hero_bg.bg[1]}  mbg_image={hero_bg.mbg[1]}/>
        <ThirdPage bg_image={hero_bg.bg[2]}  mbg_image={hero_bg.mbg[2]}/>
        <FourthPage bg_image={hero_bg.bg[3]}  mbg_image={hero_bg.mbg[3]}/>
        <FifthPage bg_image={hero_bg.bg[4]}  mbg_image={hero_bg.mbg[4]}/>
        <SixthPage bg_image={hero_bg.bg[5]}  mbg_image={hero_bg.mbg[5]}/>
      </ReactPageScroller>
    </div>
  )
}

export default App;