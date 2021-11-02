import React, { useState, useCallback } from "react";
import "./AllCategory.css";
import { useHistory } from "react-router";
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

const AllCategory = () => {
  const history = useHistory();

	const [inputStatus, setInputStatus] = useState('');

	const onClickCategory = (e) => {
    const value = e.currentTarget.getAttribute('value');
		history.push({
      pathname: "/searchItem",
      state: {
        value: value,
      },
    });
	}

	return ( 
		<div>
		
		<div className="category-table">
        <div className="toggle category-row">
          <label htmlFor="toggle1">
            <div className="toggle-category-item" value="식기" onClick={onClickCategory}>
              <img src={cutlery} alt="cutlery" className="category-icon"/>
              <p>식기</p>
            </div>
          </label>
          <label htmlFor="toggle2">
            <div className="toggle-category-item" value="의복" onClick={onClickCategory}>
              <img src={clothes} alt="clothes" className="category-icon" />
              <p>의복</p>
            </div>
          </label>
          <label htmlFor="toggle3">
            <div className="toggle-category-item" value="가전제품" onClick={onClickCategory}>
              <img src={computer} alt="computer" className="category-icon" />
              <p>가전제품</p>
            </div>
          </label>
          <label htmlFor="toggle4">
            <div className="toggle-category-item" value="서적" onClick={onClickCategory}>
              <img src={study} alt="study" className="category-icon" />
              <p>서적</p>
            </div>
          </label>
          <label htmlFor="toggle5">
            <div className="toggle-category-item" value="미용" onClick={onClickCategory}>
              <img src={hair} alt="hair" className="category-icon" />
              <p>미용</p>
            </div>
          </label>
        </div>
        <div className="toggle category-row">
          <label htmlFor="toggle6">
            <div className="toggle-category-item" value="사진" onClick={onClickCategory}>
              <img src={camera} alt="cutlery" className="category-icon" />
              <p>사진</p>
            </div>
          </label>
          <label htmlFor="toggle7">
            <div className="toggle-category-item" value="공구" onClick={onClickCategory}>
              <img src={drill} alt="clothes" className="category-icon" />
              <p>공구</p>
            </div>
          </label>
          <label htmlFor="toggle8">
            <div className="toggle-category-item" value="게임" onClick={onClickCategory}>
              <img src={gamepad} alt="gamepad" className="category-icon" />
              <p>게임</p>
            </div>
          </label>
          <label htmlFor="toggle9">
            <div className="toggle-category-item" value="음악" onClick={onClickCategory}>
              <img src={music} alt="music " className="category-icon" />
              <p>음악</p>
            </div>
          </label>
          <label htmlFor="toggle10">
            <div className="toggle-category-item" value="예술" onClick={onClickCategory}>
              <img src={art} alt="art" className="category-icon" />
              <p>예술</p>
            </div>
          </label>
        </div>
        <div className="toggle category-row">
          <label htmlFor="toggle11">
            <div className="toggle-category-item" value="육아" onClick={onClickCategory}>
              <img src={feeding} alt="feeding" className="category-icon" />
              <p>육아</p>
            </div>
          </label>
          <label htmlFor="toggle12">
            <div className="toggle-category-item" value="동물" onClick={onClickCategory}>
              <img src={dog} alt="dog" className="category-icon" />
              <p>동물</p>
            </div>
          </label>
          <label htmlFor="toggle13">
            <div className="toggle-category-item" value="야외" onClick={onClickCategory}>
              <img src={beach} alt="beach " className="category-icon" />
              <p>야외</p>
            </div>
          </label>
          <label htmlFor="toggle14">
            <div className="toggle-category-item" value="명품" onClick={onClickCategory}>
              <img src={diamond} alt="diamond " className="category-icon" />
              <p>명품</p>
            </div>
          </label>
          <label htmlFor="toggle15">
            <div className="toggle-category-item" value="기타" onClick={onClickCategory}>
              <img src={etc} alt="etc" className="category-icon" />
              <p>기타</p>
            </div>
          </label>
        </div>
      </div>
			</div>
	)
}

export default AllCategory
