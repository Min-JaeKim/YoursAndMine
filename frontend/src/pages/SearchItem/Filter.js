import React, { useState, useCallback } from "react";
import Category from "../Category/Category";
import { Form, Radio, Input, Button } from "semantic-ui-react";
import "./Filter.css";
import axios from "../../api/axios";
import { useHistory } from "react-router";
const Filter = () => {
  const history = useHistory();
  const [category, setCategory] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [order, setOrder] = useState();

  const [inputStatus, setInputStatus] = useState("");
  const handleClickRadioButton = useCallback(
    (radioBtnName) => {
      setInputStatus(radioBtnName);
    },
    [inputStatus]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("확인");
    setInputText("");
  };
  const getCategory = (category) => {
    setCategory(category);
  };

  const [inputText, setInputText] = useState("");
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const setFilter = () => {
    axios
      .post(`/search`, {
        body: {
          category: { category },
          min: { min },
          max: { max },
          orderBy: { order },
          keyword: { inputStatus },
        },
        params: {
          page: 1,
        },
      })
      .then((response) => {
        history.push(`/searchitem?text=${inputText}`);
        window.location.replace(`/searchitem?text=${inputText}`); //새로고침
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="filter">
        <div className="filter-category">
          <Category category={category} getCategory={getCategory} />
        </div>
        <hr />
        <h4>정렬</h4>
        <Form onSubmit={handleSubmit} className="radio-group">
          {/* <Form.Field>
          Selected value: <b>{inputStatus}</b>
        </Form.Field>
         */}
          <Form.Field>
            <Radio
              id="radio1"
              label="대여순"
              name="radioGroup"
              checked={inputStatus === "대여순"}
              onClick={() => handleClickRadioButton("대여순")}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              id="radio2"
              label="북마크순"
              name="radioGroup"
              checked={inputStatus === "북마크순"}
              onClick={() => handleClickRadioButton("북마크순")}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              id="radio3"
              label="최신순"
              name="radioGroup"
              checked={inputStatus === "최신순"}
              onClick={() => handleClickRadioButton("최신순")}
            />
          </Form.Field>
          <hr />
        </Form>
        <hr></hr>
        <form className="inputForm" onSubmit={handleSubmit}>
          <h4>가격범위</h4>
          <Input
            className="input-price"
            icon="search"
            iconPosition="left"
            placeholder="0"
            onChange={onChange}
            value={min}
          />
          ~
          <Input
            className="input-price"
            icon="search"
            iconPosition="left"
            placeholder="제한없음"
            onChange={onChange}
            value={max}
          />
          <br />
        </form>
        <hr />
        {/* <Button className="done-button" onClick={setFilter}>
          등록
        </Button> */}
      </div>
    </>
  );
};

export default Filter;
