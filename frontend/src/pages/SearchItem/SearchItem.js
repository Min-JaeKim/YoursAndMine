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
import { Form, Radio, Button } from "semantic-ui-react";

const SearchItem = ({ location, match }) => {
  // category 선택 후, 검색하려는 목적
  const category = useLocation();
  // const historyState = category.state;
  
  //Main.js의 SearchInput에서 넘어온 검색어(text)
  const query = queryString.parse(location.search);
  const text = query.text;
  
  //검색 Input tag관련
  const [inputText, setInputText] = useState("");
  const [word, setWord] = useState("");
  const [historyState, setHistoryState] = useState("");
  console.log(343444)
  console.log(historyState)
  //검색목록
  const [searchItem, setSearchItem] = useState([]);
  let [searchList, setSearchList] = useState([]);
  //검색필터 토글
  const [visible, setVisible] = useState(false);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };


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

  useEffect(() => {
    if (category !== 'null') {
      setHistoryState(category.state.category);
    }
  }, [])

  const onClickFilter = () => {
    setVisible(!visible);
  };

  return (
    <>
      { historyState !== '' && historyState !== undefined ? (
        <SearchInput category={historyState.category}/>
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
            <Radio className="search-radio"
              id="radio1"
              label="대여순"
              name="radioGroup"
              // checked={inputStatus === "대여순"}
              // onClick={() => handleClickRadioButton("대여순")}
            />
          </Form.Field>
          <Form.Field>
            <Radio className="search-radio"
              id="radio2"
              label="북마크순"
              name="radioGroup"
              // checked={inputStatus === "북마크순"}
              // onClick={() => handleClickRadioButton("북마크순")}
            />
          </Form.Field>
          <Form.Field>
            <Radio className="search-radio"
              id="radio3"
              label="최신순"
              name="radioGroup"
              // checked={inputStatus === "최신순"}
              // onClick={() => handleClickRadioButton("최신순")}
            />
          </Form.Field>
          <hr />
        </Form>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
