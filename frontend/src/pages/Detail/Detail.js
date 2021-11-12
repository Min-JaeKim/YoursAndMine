import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCalendar from "./DetailCalendar";
import "./Detail.css";
import unlikeIcon from "../../assets/icons/wish.png";
import likeIcon from "../../assets/icons/wish-on.png";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import axios from "../../api/axios";
import Slider from "react-slick";

export const Detail = (props) => {
  const history = useHistory();
  const { pNo } = useParams();
  const [detail, setDetail] = useState({});
  const [unavailableDate, setUnavailableDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .get(`/item/${pNo}`, {})
      .then((response) => {
        console.log(response.data);
        setDetail(response.data.item);
        setUnavailableDate(response.data.unavailableDate);
        setLoading(false);
        // setLike(response.data.bookmark);
      })
      .catch((error) => {
        alert("상품 내역이 존재하지 않습니다.");
        history.push("/");
      });
  }, []);

  const onSelectProduct = () => {
    history.push({
      pathname: "/rent",
      state: {
        itemId: detail.itemId,
        ownerWallet: detail.owner.wallet,
        ownerId: detail.owner.uid,
        price: detail.price,
      },
    });
  };

  const onLike = (e) => {
    setLike(true);
    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .post(
        `/bookmark/${detail.itemId}`,
        {},
        {
          headers: {
            Authentication: "Bearer " + token,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        alert("찜버튼을 다시 눌러 주세요.");
      });
  };

  const onUnLike = (e) => {
    setLike(false);
    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .delete(`/bookmark/${detail.itemId}`, {
        headers: {
          Authentication: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((error) => {
        alert("찜버튼을 다시 눌러 주세요.");
      });
  };

  return (
    <div>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {/* <Button style={{ backgroundColor: "#497C5F", color: "white" }} className="detail-mayment" onClick={onSelectProduct}>
								삭제
							</Button> */}
          <Slider {...settings}>
            {detail
              ? detail.itemImage.map((image) => (
                  <img key={image} src={image} alt="product" className="detail-product" />
                ))
              : null}
          </Slider>

          {/* <img src={detail.itemImage[0]} alt="product" className="detail-product" /> */}
          <div className="detail-profile">
            <img src={detail.owner.ownerImageUrl} alt="product" className="detail-user-icon" />
            <div className="detail-user-info">
              <div className="detail-user-name">{detail.owner.ownerNickName}</div>
              <div className="detail-user-address">{detail.owner.ownerAddress}</div>
            </div>
            <div className="detail-like">
              {like ? (
                <img
                  src={likeIcon}
                  alt="likeIcon"
                  className="detail-like-icon"
                  onClick={onUnLike}
                />
              ) : (
                <img
                  src={unlikeIcon}
                  alt="likeIcon"
                  className="detail-like-icon"
                  onClick={onLike}
                />
              )}
              <div>관심 등록</div>
            </div>
          </div>
          <div className="detail-product-header">
            <div className="detail-product-name">{detail.itemName}</div>
            <div className="detail-product-category-time">{detail.itemCategory}</div>
          </div>
          <div className="detail-inquire-buy">
            <div className="detail-oneday-price">
              <div className="detail-price">₩ {detail.itemPrice.toLocaleString("ko-KR")}</div>
              <div className="detail-day">1일 기준</div>
            </div>
            <div className="detail-button">
              <Button
                style={{ backgroundColor: "#497C5F", color: "white" }}
                className="detail-mayment"
                onClick={onSelectProduct}
              >
                문의하기
              </Button>
            </div>
          </div>

          <div className="detail-tabs">
            <div className="tab-2">
              <label htmlFor="tab2-1">상품 상세</label>
              <input id="tab2-1" name="tabs-two" type="radio" defaultChecked="checked" />
              <div>
                <div className="detail-product-detail">
                  <div className="detail-product-content">{detail.itemContent}</div>
                </div>
              </div>
            </div>
            <div className="tab-2">
              <label htmlFor="tab2-2">대여 가능 일정</label>
              <input id="tab2-2" name="tabs-two" type="radio" />
              <div>
                <div>
                  <div className="detail-product-detail">
                    <DetailCalendar unavailableDate={unavailableDate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Detail;
