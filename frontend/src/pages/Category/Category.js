import React, { useState, useCallback } from "react";
import './Category.css'
import { useLocation } from "react-router";
import AllCategory from "../../components/AllCategory/AllCategory";

const Category = ({ flag, category, getCategory }) => {
  const location = useLocation();
  const historyState = location.state;
  const [inputStatus, setInputStatus] = useState("");
  const [writeCategory, setWriteCategory] = useState("");

  const handleClickRadioButton = useCallback(
    (radioBtnName) => {
      // setInputStatus(radioBtnName);
      // getCategory(radioBtnName);
    },
    [inputStatus]
  );
  
  const funcSetCategory = (category) => {
    setWriteCategory(category);
  }

  return (
    <div className="cd-category">
      {flag ? (
        <div>
          <div className="cg-set-category">
            <h4 className="cg-write-category">
              카테고리
            </h4>
            {/* <div>1</div> */}
            <div>{writeCategory}</div>
          </div>
          <AllCategory flag="1" funcSetCategory={funcSetCategory}/>
        </div>
      ) : (
        <div>
          <div className="cg-search-category">
            카테고리
          </div>
          <AllCategory flag="2" />
        </div>
      )}
    </div>
  );
};

export default Category;
