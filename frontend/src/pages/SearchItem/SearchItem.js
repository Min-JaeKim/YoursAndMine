import React, { useState, useEffect } from "react";
import "./Filter.css";
import axios from "axios";
import "./SearchItem.css";
import "./SearchResult.css";
import Filter from "./Filter";
import queryString from "query-string";
import { Input } from "semantic-ui-react";
import { useLocation } from "react-router";
import noImage from "../../assets/image/no-image.jpg";
// import product from "../../assets/image/product.png";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../../components/SearchInput/SearchInput";

const SearchItem = ({ location, match }) => {
  // 카테고리로 필터링 했을 때,
  const location2 = useLocation();
  const historyState = location2.state;
  console.log(historyState);

  //Main.js의 SearchInput에서 넘어온 검색어(text)
  const query = queryString.parse(location.search);
  const text = query.text;

  //검색 Input tag관련
  const [inputText, setInputText] = useState("");
  const [word, setWord] = useState("");
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  //검색목록
  const [searchItem, setSearchItem] = useState([]);
  let [searchList, setSearchList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/search/keyword`, {
        params: {
          keyword: text,
          page: 1,
        },
      })
      .then((response) => {
        console.log(response);
        setSearchItem(response.data);
        setSearchList(new Array(response.data.length).fill(true));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputText]);

  //검색필터 토글
  const [visible, setVisible] = useState(false);
  const onClickFilter = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SearchInput />
      <div className="filter">
        <h4 onClick={onClickFilter}>
          <FontAwesomeIcon icon={faFilter} /> 검색필터
        </h4>
        <hr></hr>
      </div>
      {!visible && (
        <div className="search-result">
          {searchItem &&
            searchItem.map((item, idx) => {
              return (
                <div key={idx} className="search-result-item">
                  <div>
                    <img
                      src={item.image ? item.image : noImage}
                      className="wish-item-icon"
                      alt="product"
                    ></img>
                  </div>
                  <div>
                    <h3>{item.itemname}</h3>
                    <p>{item.position}</p>
                    <h4>{item.price} BLI</h4>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {visible && <Filter />}
    </>
  );
};

export default SearchItem;
