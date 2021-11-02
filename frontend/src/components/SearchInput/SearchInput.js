import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import './SearchInput.css'

const SearchInput = ({category}) => {

  // 카테고리로 필터링 했을 때,
  const location = useLocation();
  const historyState = location.state;

  const history = useHistory();
  const [inputText, setInputText] = useState("");
  const [searchCategory, setSearchCategory] = useState(undefined);

  useEffect(() => {
    if (historyState?.category) {
      setSearchCategory(historyState.category);
    }
  }, [])
  
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: `/searchitem?text=${inputText}`,
      state: {
        category: category,
      },
    });
    // history.push(`/searchitem?text=${inputText}`);
    window.location.replace(`/searchitem?text=${inputText}`); //새로고침
  };

  const deleteCategory = () => {
    setSearchCategory(undefined);
  }

  return (
    <>
    <form className="inputForm" onSubmit={handleSubmit}>
      <div className="search-input">
        {searchCategory ? (
          <div className="input-tag">
              <div className="input-tag-text">{searchCategory}</div>
              <div className="input-tag-cancel" onClick={deleteCategory}>X</div>
          </div>
        ) : (
          null
        )}
        <input 
        type="text"
        onChange={onChange}
        placeholder="상품명을 입력해주세요" />
      </div>
    </form>
      {/* <form className="inputForm" onSubmit={handleSubmit}>
        <Input
          className="main-search"
          icon="search"
          iconPosition="left"
          placeholder="상품명을 입력해주세요"
          onChange={onChange}
          value={inputText}
        />
        <br />
      </form> */}
    </>
  );
};

export default SearchInput;
