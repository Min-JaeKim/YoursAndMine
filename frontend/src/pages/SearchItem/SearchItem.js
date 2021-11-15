import React, { useState, useEffect } from "react";
import "./Filter.css";
import axios from "../../api/axios";
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
import { Form, Radio, Button } from "semantic-ui-react";
import ProductCard from "../Product/ProductCard";

const SearchItem = ({ location, match }) => {
  // category 선택 후, 검색하려는 목적
  // const category = useState("");
  // const historyState = category.state;

  //Main.js의 SearchInput에서 넘어온 검색어(text)
  const query = queryString.parse(location.search);
  const keyword = query.keyword;
  const category = query.category;
  let sort = query.sort;

  //검색 Input tag관련
  const [inputText, setInputText] = useState("");
  const [word, setWord] = useState("");
  const [historyState, setHistoryState] = useState("");
  console.log(category);
  console.log(historyState);
  //검색목록
  const [searchItem, setSearchItem] = useState([]);
  let [searchList, setSearchList] = useState([]);
  //검색필터 토글
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState();

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/search`, {
        params: {
          category: category,
          keyword: keyword,
          sort: sort
        },
      })
      .then((response) => {
        console.log(response);
        setProducts(response.data);
        setSearchItem(response.data);
        setSearchList(new Array(response.data.length).fill(true));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputText]);

  useEffect(() => {
    // if (category !== "null") {
    //   setHistoryState(category.state.category);
    // }
  }, []);

  const onClickFilter = () => {
    setVisible(!visible);
  };

  function handleClickRadioButton(searchType) {
    console.log(searchType)
    axios
        .get(`/search`, {
          params: {
            category: category,
            keyword: keyword,
            sort: searchType
          },
        })
        .then((response) => {
          console.log(response);
          setProducts(response.data);
          // setSearchItem(response.data);
          // setSearchList(new Array(response.data.length).fill(true));
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <>
      {category !== "" && category !== undefined ? (
        <SearchInput category={category} />
      ) : (
        <SearchInput />
      )}
      <div className="search-filter">
        <FontAwesomeIcon className="search-filter-icon" icon={faFilter} />
        <h4 className="search-filter-text">정렬</h4>
        <div>
          <Form onSubmit={handleSubmit} className="radio-group">
            {/* <Form.Field>
          Selected value: <b>{inputStatus}</b>
        </Form.Field>
         */}
            <Form.Field>
              <Radio
                  className="search-radio"
                  id="radio3"
                  label="최신순"
                  name="radioGroup"
                  // checked={inputStatus === "최신순"}
                  onClick={() => handleClickRadioButton(1)}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="search-radio"
                id="radio1"
                label="대여순"
                name="radioGroup"
                // checked={inputStatus === "대여순"}
                onClick={() => handleClickRadioButton(2)}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="search-radio"
                id="radio2"
                label="북마크순"
                name="radioGroup"
                // checked={inputStatus === "북마크순"}
                onClick={() => handleClickRadioButton(3)}
              />
            </Form.Field>
            <hr />
          </Form>
        </div>
      </div>
      <div>
        {products
            ? products.map((product, idx) => (
                <ProductCard product={product} key={product.itemId}></ProductCard>
            ))
            : null}
      </div>
    </>
  );
};

export default SearchItem;
