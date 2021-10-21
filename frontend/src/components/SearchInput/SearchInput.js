import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router";
const SearchInput = () => {
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
  return <>
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
  </>;
};

export default SearchInput;
