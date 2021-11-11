import axios from "../../api/axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import DetailCalendar from "./DetailCalendar";
import React, { useState, useEffect } from "react";

import "./Detail.css";
import Slider from "react-slick";
import { Swal } from "sweetalert2";
import { Button } from "semantic-ui-react";
import unlikeIcon from "../../assets/icons/wish.png";
import likeIcon from "../../assets/icons/wish-on.png";

export const Detail = () => {
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

  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/item/${pNo}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setDetail(response.data.item);
          setUnavailableDate(response.data.unavailableDate);
          setLoading(false);
          if (response.data.item.bookmark === 'Y') {
            setLike(true);
          } else {
            setLike(false);
          }
        })
        .catch((error) => {
          alert("상품 내역이 존재하지 않습니다.");
          history.push("/");
        });
    } else {
      axios
        .get(`/item/${pNo}`, {
        })
        .then((response) => {
          // console.log(response.data);
          setDetail(response.data.item);
          setUnavailableDate(response.data.unavailableDate);
          setLoading(false);
          // setLike(response.data.bookmark);
        })
        .catch((error) => {
          alert("상품 내역이 존재하지 않습니다.");
          history.push("/");
        });
    }
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
    console.log('onLike');
    console.log(token);
    axios
    .post(`/item/bookmark/${detail.itemId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      })
        .then((response) => {

        })
        .catch((error) => {
          alert("상품 내역이 존재하지 않습니다.");
        });
  };

  const onUnLike = (e) => {
    setLike(false);
    console.log('onUnLike');
    console.log(token);
    axios
    .delete(`/item/bookmark/${detail.itemId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      })
        .then((response) => {

        })
        .catch((error) => {
          alert("상품 내역이 존재하지 않습니다.");
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
            {token ? 
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
              </div> : null
            }
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
                    <DetailCalendar unavailableDate={unavailableDate}/>
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
