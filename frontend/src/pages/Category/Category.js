import React, { useState, useCallback } from "react";
import "./Category.css";
// import data from "./Category.json";
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

const Category = ({ category, getCategory }) => {
  const [inputStatus, setInputStatus] = useState("");
  const handleClickRadioButton = useCallback(
    (radioBtnName) => {
      setInputStatus(radioBtnName);
      getCategory(radioBtnName);
    },
    [inputStatus]
  );
  return (
    <>
      <div className="category-top">
        <h4>카테고리 설정</h4>
        <p>{inputStatus}</p>
      </div>
      <div className="category-table">
        <div className="toggle category-row">
          <input
            type="radio"
            id="toggle1"
            name="category"
            checked={inputStatus === "식기"}
            onClick={() => handleClickRadioButton("식기")}
            readOnly
          />
          <label htmlFor="toggle1">
            <div className="toggle-category-item">
              <img src={cutlery} alt="cutlery" className="category-icon" />
              <p>식기</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle2"
            name="category"
            checked={inputStatus === "의복"}
            onClick={() => handleClickRadioButton("의복")}
            readOnly
          />
          <label htmlFor="toggle2">
            <div className="toggle-category-item">
              <img src={clothes} alt="clothes" className="category-icon" />
              <p>의복</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle3"
            name="category"
            checked={inputStatus === "가전제품"}
            onClick={() => handleClickRadioButton("가전제품")}
            readOnly
          />
          <label htmlFor="toggle3">
            <div className="toggle-category-item">
              <img src={computer} alt="computer" className="category-icon" />
              <p>가전제품</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle4"
            name="category"
            checked={inputStatus === "서적"}
            onClick={() => handleClickRadioButton("서적")}
            readOnly
          />
          <label htmlFor="toggle4">
            <div className="toggle-category-item">
              <img src={study} alt="study" className="category-icon" />
              <p>서적</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle5"
            name="category"
            checked={inputStatus === "미용"}
            onClick={() => handleClickRadioButton("미용")}
            readOnly
          />
          <label htmlFor="toggle5">
            <div className="toggle-category-item">
              <img src={hair} alt="hair" className="category-icon" />
              <p>미용</p>
            </div>
          </label>
        </div>
        <div className="toggle category-row">
          <input
            type="radio"
            id="toggle6"
            name="category"
            checked={inputStatus === "사진"}
            onClick={() => handleClickRadioButton("사진")}
            readOnly
          />
          <label htmlFor="toggle6">
            <div className="toggle-category-item">
              <img src={camera} alt="cutlery" className="category-icon" />
              <p>사진</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle7"
            name="category"
            checked={inputStatus === "공구"}
            onClick={() => handleClickRadioButton("공구")}
            readOnly
          />
          <label htmlFor="toggle7">
            <div className="toggle-category-item">
              <img src={drill} alt="clothes" className="category-icon" />
              <p>공구</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle8"
            name="category"
            checked={inputStatus === "게임"}
            onClick={() => handleClickRadioButton("게임")}
            readOnly
          />
          <label htmlFor="toggle8">
            <div className="toggle-category-item">
              <img src={gamepad} alt="gamepad" className="category-icon" />
              <p>게임</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle9"
            name="category"
            checked={inputStatus === "음악"}
            onClick={() => handleClickRadioButton("음악")}
            readOnly
          />
          <label htmlFor="toggle9">
            <div className="toggle-category-item">
              <img src={music} alt="music " className="category-icon" />
              <p>음악</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle10"
            name="category"
            checked={inputStatus === "예술"}
            onClick={() => handleClickRadioButton("예술")}
            readOnly
          />
          <label htmlFor="toggle10">
            <div className="toggle-category-item">
              <img src={art} alt="art" className="category-icon" />
              <p>예술</p>
            </div>
          </label>
        </div>
        <div className="toggle category-row">
          <input
            type="radio"
            id="toggle11"
            name="category"
            checked={inputStatus === "육아"}
            onClick={() => handleClickRadioButton("육아")}
            readOnly
          />
          <label htmlFor="toggle11">
            <div className="toggle-category-item">
              <img src={feeding} alt="feeding" className="category-icon" />
              <p>육아</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle12"
            name="category"
            checked={inputStatus === "동물"}
            onClick={() => handleClickRadioButton("동물")}
            readOnly
          />
          <label htmlFor="toggle12">
            <div className="toggle-category-item">
              <img src={dog} alt="dog" className="category-icon" />
              <p>동물</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle13"
            name="category"
            checked={inputStatus === "야외"}
            onClick={() => handleClickRadioButton("야외")}
            readOnly
          />
          <label htmlFor="toggle13">
            <div className="toggle-category-item">
              <img src={beach} alt="beach " className="category-icon" />
              <p>야외</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle14"
            name="category"
            checked={inputStatus === "명품"}
            onClick={() => handleClickRadioButton("명품")}
            readOnly
          />
          <label htmlFor="toggle14">
            <div className="toggle-category-item">
              <img src={diamond} alt="diamond " className="category-icon" />
              <p>명품</p>
            </div>
          </label>
          <input
            type="radio"
            id="toggle15"
            name="category"
            checked={inputStatus === "기타"}
            onClick={() => handleClickRadioButton("기타")}
            readOnly
          />
          <label htmlFor="toggle15">
            <div className="toggle-category-item">
              <img src={etc} alt="etc" className="category-icon" />
              <p>기타</p>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Category;
