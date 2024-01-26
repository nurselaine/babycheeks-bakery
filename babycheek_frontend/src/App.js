import React, { useState } from "react";
import ReactPageScroller from "react-page-scroller";
import FirstPage from "./Page/FirstPage";
import hero_bg from "./utils/home_data.json";
import "./App.css";
import LandingLayout from "./Layout/LandingLayout";

const App = () => {
  const [page, setPage] = useState(null);

  const handlePageChange = (number) => {
    setPage(number);
  };

  let cookies = [0, 1, 2, 3, 4, 5];

  return (
    <div id="App">
      <LandingLayout>
        <ReactPageScroller
          pageOnChange={handlePageChange}
          customPageNumber={page}
        >
          {cookies.map((c, idx) => (
            <FirstPage
              key={`${c}-${idx}`}
              page_num={idx}
              bg_image={hero_bg.bg[idx]}
              mbg_image={hero_bg.mbg[idx]}
            />
          ))}
        </ReactPageScroller>
      </LandingLayout>
    </div>
  );
};

export default App;
