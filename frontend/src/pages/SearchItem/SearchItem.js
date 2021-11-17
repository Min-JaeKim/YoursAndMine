import React, { useState, useEffect } from "react";
import "./Filter.css";
import axios from "../../api/axios";
import "./SearchItem.css";
import "./SearchResult.css";
import queryString from "query-string";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../../components/SearchInput/SearchInput";
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
  const [products, setProducts] = useState();
  let [isOneSelected, isTwoSelected, isThreeSelected] = useState(false);
  const [oneStyle, setOneStyle] = useState("search-type-selected");
  const [twoStyle, setTwoStyle] = useState("search-type");
  const [threeStyle, setThreeStyle] = useState("search-type")

  // console.log("keyword : " + keyword)
  // console.log("category : " + category)
  // console.log("sort : " + sort)

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
        // console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inputText]);

  const funcSort = (searchType) => {
    axios
        .get(`/search`, {
          params: {
            category: category,
            keyword: keyword,
            sort: searchType
          },
        })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    if(searchType == 1){
        setOneStyle("search-type-selected")
        setTwoStyle("search-type")
        setThreeStyle("search-type")
    }else if(searchType == 2) {
        setOneStyle("search-type")
        setTwoStyle("search-type-selected")
        setThreeStyle("search-type")
    }else{
        setOneStyle("search-type")
        setTwoStyle("search-type")
        setThreeStyle("search-type-selected")
    }
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
        <div className="search-sort-group">
          <div className={oneStyle} onClick={() => {funcSort(1)}}>최신순</div>
          <div className={twoStyle} onClick={() => {funcSort(2)}}>북마크순</div>
          <div className={threeStyle} onClick={() => {funcSort(3)}}>대여순</div>
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
