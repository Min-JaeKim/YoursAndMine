import React, { useState, useCallback } from "react";
import './Category.css'
import AllCategory from "../../components/AllCategory/AllCategory";

const Category = ({ category, getCategory }) => {
  const [inputStatus, setInputStatus] = useState("");
  const handleClickRadioButton = useCallback(
    (radioBtnName) => {
      // setInputStatus(radioBtnName);
      // getCategory(radioBtnName);
    },
    [inputStatus]
  );
  return (
    <div className="cd-category">

      <div className="cg-category-top">
        카테고리
      </div>
      <AllCategory />
    </div>
  );
};

export default Category;
