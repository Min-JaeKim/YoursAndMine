import React, { useState } from "react";
import Filter from "./Filter";
import "./SearchResult.css";
import product from "../../assets/image/product.png";
const SearchResult = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const onClickFilter = () => {
    setVisible(!visible);
  };
  console.log(text);
  return (
    <>
      {!visible && (
        <div className="search-result">
          <h3>최근 검색어</h3>
          <p>{text}</p>
          <hr></hr>
          <h4 onClick={onClickFilter}>검색필터</h4>
          <hr></hr>
          <div className="search-result-item">
            <div>
              <img src={product} alt="product" className="mypage-user-icon" />
            </div>
            <div>
              <h3>유레카 노트북</h3>
              <p>대치동</p>
              <h4>15,000원</h4>
            </div>
          </div>
          <hr></hr>
          <div className="search-result-item">
            <div>
              <img src={product} alt="product" className="mypage-user-icon" />
            </div>
            <div>
              <h3>유레카 노트북</h3>
              <p>대치동</p>
              <h4>15,000원</h4>
            </div>
          </div>
          <hr></hr>
          <div className="search-result-item">
            <div>
              <img src={product} alt="product" className="mypage-user-icon" />
            </div>
            <div>
              <h3>유레카 노트북</h3>
              <p>대치동</p>
              <h4>15,000원</h4>
            </div>
          </div>
          <hr></hr>
        </div>
      )}
      {visible && <Filter />}
    </>
  );
};

export default SearchResult;
