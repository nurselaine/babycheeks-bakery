import React, { useEffect, useState } from "react";
import ReactPageScroller from "react-page-scroller";
import FirstPage from "./Page/FirstPage";
import "./App.css";
import LandingLayout from "./Layout/LandingLayout";
import { useSelector } from "react-redux";

const App = () => {
  const [page, setPage] = useState(null);

  const handlePageChange = (number) => {
    setPage(number);
  };

  const page_data = useSelector((state) => state.menuItems);

  return (
    <div id="App">
      <LandingLayout>
        <ReactPageScroller
          pageOnChange={handlePageChange}
          customPageNumber={page}
        >
          {page_data.map((c, idx) => (
            <FirstPage
              key={`page_key_${c.item_id}`}
              item_id={c.item_id}
              page_num={idx}
              bg_image={c.item_assets.bg}
              mbg_image={c.item_assets.mbg}
            />
          ))}
        </ReactPageScroller>
      </LandingLayout>
    </div>
  );
};

export default App;
