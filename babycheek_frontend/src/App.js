import React, { useEffect, useState } from "react";
import ReactPageScroller from "react-page-scroller";
import FirstPage from "./Page/FirstPage";
import "./App.css";
import LandingLayout from "./Layout/LandingLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./Redux/actions/cartActions";

const App = () => {
  const [page, setPage] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const handlePageChange = (number) => {
    setPage(number);
  };

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!dataFetched){
      setDataFetched(true);
      dispatch(fetchData());
    }
  }, [dispatch, dataFetched]);
  
  const page_data = useSelector((state) => state.cart.menuItems);

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
              page_num={idx + 1}
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
