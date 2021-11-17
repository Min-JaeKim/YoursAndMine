import axios from "../../api/axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import DetailCalendar from "./DetailCalendar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertMessage } from "../../redux/reducers/ConversationList";

import "./Detail.css";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { Button } from "semantic-ui-react";
import unlikeIcon from "../../assets/icons/wish.png";
import likeIcon from "../../assets/icons/wish-on.png";

export const Detail = (props) => {
  const history = useHistory();
  const { pNo } = useParams();
  const [detail, setDetail] = useState({});
  const [unavailableDate, setUnavailableDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

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
          setDetail(response.data.item);
          setUnavailableDate(response.data.unavailableDate);
          setLoading(false);
          if (response.data.item.bookmark === "Y") {
            setLike(true);
          } else {
            setLike(false);
          }
        })
        .catch((error) => {
          history.push("/");
        });
    } else {
      axios
        .get(`/item/${pNo}`, {})
        .then((response) => {
          // console.log(response.data);
          setDetail(response.data.item);
          setUnavailableDate(response.data.unavailableDate);
          setLoading(false);
          // setLike(response.data.bookmark);
        })
        .catch((error) => {
          history.push("/");
        });
    }
  }, []);

  const onSelectProduct = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.userAddress);
    if (!user || !user.userAddress) {
      if (token === null) {
        Swal.fire({
          title: "Error!",
          text: "로그인 후 이용 가능합니다.",
          icon: "error",
          confirmButtonText: "OK!",
          confirmButtonColor: "#497c5f",
        }).then((res) => {
          history.push("/signin");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "주소 지정 후 이용 가능합니다.",
          icon: "error",
          confirmButtonText: "OK!",
          confirmButtonColor: "#497c5f",
        })
        .then(() => {
          history.push("/searchplace");
        })
      }
    } else {
      const timestamp = new Date();
      props.client.current.publish({
        destination: "/app/send",
        body: JSON.stringify({
          type: "create",
          message: JSON.stringify({
            name: detail.owner.ownerNickName,
            userImg: detail.owner.ownerImageUrl,
            itemImg: detail.itemImage[0],
            itemName: detail.itemName,
          }),
          author: userId, // 내이름
          to: detail.owner.ownerId,
          itemPk: pNo,
          timestamp: timestamp.getTime(),
        }),
      });
  
      const m = {
        type: "create",
        message: JSON.stringify({
          name: detail.owner.ownerNickName,
          userImg: detail.owner.ownerImageUrl,
          itemImg: detail.itemImage[0],
          itemName: detail.itemName,
        }),
        author: userId, // 내이름
        to: detail.owner.ownerId,
        itemPk: pNo,
        timestamp: timestamp.getTime(),
      };
      console.log(m);
      // dispatch(insertMessage(m));
  
      history.replace({
        pathname: "/chat",
        state: { userPK: detail.owner.ownerId },
        // state: { userPK: detail.owner.ownerId + "-" + detail.itemId },
      });
    }
  };

  const onLike = (e) => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .post(
        `/item/bookmark/${detail.itemId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setLike(true);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "관심 등록이 불가합니다.",
          icon: "error",
          confirmButtonText: "OK!",
          confirmButtonColor: "#497c5f",
        });
      });
  };

  const onUnLike = (e) => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .delete(`/item/bookmark/${detail.itemId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setLike(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "관심 등록 취소 불가합니다.",
          icon: "error",
          confirmButtonText: "OK!",
          confirmButtonColor: "#497c5f",
        });
      });
  };

  return (
    <div>
      {loading ? (
        <div className="product-loader">loading...</div>
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
            {token ? (
              detail.owner.ownerId === userId 
              ?
              <div className="detail-owner-button">
                <Button className="detail-put-product">
                  수정
                </Button>
                <Button className="detail-delete-product">
                  삭제
                </Button>
              </div>
              :
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
            ) : null}
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
