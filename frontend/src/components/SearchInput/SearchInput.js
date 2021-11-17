import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import "./SearchInput.css";
import queryString from "query-string";

const SearchInput = () => {
  // 카테고리로 필터링 했을 때,
  const location = useLocation();
  const historyState = location.state;

  const history = useHistory();
  const [inputText, setInputText] = useState("");
  const [searchCategory, setSearchCategory] = useState(undefined);
  const query = queryString.parse(location.search);
  const keyword = query.keyword;
  const searchedWord = keyword;
  let category

  useEffect(() => {
    if (historyState?.category) {
      setSearchCategory(historyState.category);
    }
    category = query.category;
    // console.log(category)
    if(category !== "undefined")
      setSearchCategory(category);
    // console.log(searchCategory)
  }, []);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push({
    //   pathname: `/searchitem?category=${searchCategory}&keyword=${inputText}&sort=1`,
    // });
    // history.push(`/searchitem?text=${inputText}`);
    window.location.replace(`/searchitem?category=${searchCategory}&keyword=${inputText}&sort=1`); //새로고침
  };

  const deleteCategory = () => {
    setSearchCategory(undefined);
    category = null
    // console.log(category)
  };

  return (
      <>
        <form className="inputForm" onSubmit={handleSubmit}>
          <div className="search-input">
            {searchCategory ? (
                <div className="input-tag">
                  <span className="input-tag-text">{searchCategory}</span>
                  <div className="input-tag-cancel" onClick={deleteCategory}>
                    X
                  </div>
                </div>
            ) : null}
            <input type="text" onChange={onChange} placeholder= {searchedWord == "" ? "상품명을 입력해주세요" : searchedWord} />
          </div>
        </form>
      </>
  );
};

export default SearchInput;
