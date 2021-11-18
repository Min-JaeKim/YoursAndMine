import { useHistory } from "react-router";
import React, { useState, useCallback } from "react";

import "./AllCategory.css";
import art from "../../assets/icons/category/art.png";
import beach from "../../assets/icons/category/beach.png";
import camera from "../../assets/icons/category/camera.png";
import clothes from "../../assets/icons/category/clothes.png";
import computer from "../../assets/icons/category/computer.png";
import cutlery from "../../assets/icons/category/cutlery.png";
import diamond from "../../assets/icons/category/diamond.png";
import dog from "../../assets/icons/category/dog.png";
import drill from "../../assets/icons/category/drill.png";
import etc from "../../assets/icons/category/more.png";
import gamepad from "../../assets/icons/category/gamepad.png";
import hair from "../../assets/icons/category/hair.png";
import study from "../../assets/icons/category/study.png";
import music from "../../assets/icons/category/music.png";
import feeding from "../../assets/icons/category/feeding-bottle.png";

const AllCategory = (props) => {
  // const AllCategory = ( {flag, writeCategory} ) => {
  const history = useHistory();
  const [inputStatus, setInputStatus] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const onClickCategory = (e) => {
    const category = e.currentTarget.getAttribute("value");
    setSelectCategory(category);

    if (props.flag === "1") {
      e.preventDefault();
      // this.props.onCreate(category);
      props.funcSetCategory(category);
    } else {
      history.push(`/searchItem?category=${category}&keyword=&sort=1`);
    }
  };

  return (
    <div>
      <div className="category-table">
        <div className="toggle category-row">
          <label htmlFor="toggle1">
            <div className="toggle-category-item" value="식기" onClick={onClickCategory}>
              <img
                src={cutlery}
                alt="cutlery"
                className={selectCategory === "식기" ? "category-color" : "category-gray"}
              />
              <p>식기</p>
            </div>
          </label>
          <label htmlFor="toggle2">
            <div className="toggle-category-item" value="의복" onClick={onClickCategory}>
              <img
                src={clothes}
                alt="clothes"
                className={selectCategory === "의복" ? "category-color" : "category-gray"}
              />
              <p>의복</p>
            </div>
          </label>
          <label htmlFor="toggle3">
            <div className="toggle-category-item" value="가전제품" onClick={onClickCategory}>
              <img
                src={computer}
                alt="computer"
                className={selectCategory === "가전제품" ? "category-color" : "category-gray"}
              />
              <p>가전제품</p>
            </div>
          </label>
          <label htmlFor="toggle4">
            <div className="toggle-category-item" value="서적" onClick={onClickCategory}>
              <img
                src={study}
                alt="study"
                className={selectCategory === "서적" ? "category-color" : "category-gray"}
              />
              <p>서적</p>
            </div>
          </label>
          <label htmlFor="toggle5">
            <div className="toggle-category-item" value="미용" onClick={onClickCategory}>
              <img
                src={hair}
                alt="hair"
                className={selectCategory === "미용" ? "category-color" : "category-gray"}
              />
              <p>미용</p>
            </div>
          </label>
        </div>
        <div className="toggle category-row">
          <label htmlFor="toggle6">
            <div className="toggle-category-item" value="사진" onClick={onClickCategory}>
              <img
                src={camera}
                alt="cutlery"
                className={selectCategory === "사진" ? "category-color" : "category-gray"}
              />
              <p>사진</p>
            </div>
          </label>
          <label htmlFor="toggle7">
            <div className="toggle-category-item" value="공구" onClick={onClickCategory}>
              <img
                src={drill}
                alt="clothes"
                className={selectCategory === "공구" ? "category-color" : "category-gray"}
              />
              <p>공구</p>
            </div>
          </label>
          <label htmlFor="toggle8">
            <div className="toggle-category-item" value="게임" onClick={onClickCategory}>
              <img
                src={gamepad}
                alt="gamepad"
                className={selectCategory === "게임" ? "category-color" : "category-gray"}
              />
              <p>게임</p>
            </div>
          </label>
          <label htmlFor="toggle9">
            <div className="toggle-category-item" value="음악" onClick={onClickCategory}>
              <img
                src={music}
                alt="music "
                className={selectCategory === "음악" ? "category-color" : "category-gray"}
              />
              <p>음악</p>
            </div>
          </label>
          <label htmlFor="toggle10">
            <div className="toggle-category-item" value="예술" onClick={onClickCategory}>
              <img
                src={art}
                alt="art"
                className={selectCategory === "예술" ? "category-color" : "category-gray"}
              />
              <p>예술</p>
            </div>
          </label>
        </div>
        <div className="toggle category-row">
          <label htmlFor="toggle11">
            <div className="toggle-category-item" value="육아" onClick={onClickCategory}>
              <img
                src={feeding}
                alt="feeding"
                className={selectCategory === "육아" ? "category-color" : "category-gray"}
              />
              <p>육아</p>
            </div>
          </label>
          <label htmlFor="toggle12">
            <div className="toggle-category-item" value="동물" onClick={onClickCategory}>
              <img
                src={dog}
                alt="dog"
                className={selectCategory === "동물" ? "category-color" : "category-gray"}
              />
              <p>동물</p>
            </div>
          </label>
          <label htmlFor="toggle13">
            <div className="toggle-category-item" value="야외" onClick={onClickCategory}>
              <img
                src={beach}
                alt="beach "
                className={selectCategory === "야외" ? "category-color" : "category-gray"}
              />
              <p>야외</p>
            </div>
          </label>
          <label htmlFor="toggle14">
            <div className="toggle-category-item" value="명품" onClick={onClickCategory}>
              <img
                src={diamond}
                alt="diamond "
                className={selectCategory === "명품" ? "category-color" : "category-gray"}
              />
              <p>명품</p>
            </div>
          </label>
          <label htmlFor="toggle15">
            <div className="toggle-category-item" value="기타" onClick={onClickCategory}>
              <img
                src={etc}
                alt="etc"
                className={selectCategory === "기타" ? "category-color" : "category-gray"}
              />
              <p>기타</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
