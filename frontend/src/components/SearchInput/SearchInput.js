import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import './SearchInput.css'

const SearchInput = () => {
  // 카테고리로 필터링 했을 때,
  const location = useLocation();
  const historyState = location.state;
  console.log(historyState);

  const history = useHistory();
  const [inputText, setInputText] = useState("");
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/searchitem?text=${inputText}`);
    window.location.replace(`/searchitem?text=${inputText}`); //새로고침
  };
  return (
    <>
    <div className="input-tag">
        <div className="input-tag-text">식기</div>
        <div className="input-tag-cancel">X</div>
    </div>
      <form className="inputForm" onSubmit={handleSubmit}>
        <Input
          className="main-search"
          icon="search"
          iconPosition="left"
          placeholder="상품명을 입력해주세요"
          onChange={onChange}
          value={inputText}
        />
        <br />
      </form>
    </>
  );
};

export default SearchInput;
