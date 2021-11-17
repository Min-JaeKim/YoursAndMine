import axios from "../../api/axios";
import React, { useEffect, useState } from "react";

import "./Wish.css";
import Swal from "sweetalert2";
import unlikeIcon from "../../assets/icons/wish.png";
import noImage from "../../assets/image/no-image.jpg";
import likeIcon from "../../assets/icons/wish-on.png";

const Wish = ({ history }) => {
  const [wishProduct, setWishProduct] = useState([]);
  const [likeFalg, setLikeFlag] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("token"));
  let [likeList, setLikeList] = useState([]);
  // like = new Array(wishProduct.length).fill(true);

  useEffect(() => {
    axios
      .get(`/user/wishlist`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setWishProduct(response.data);
        setLikeList(new Array(response.data.length).fill(true));
        setLikeFlag(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addBookmark = (itemId, idx) => {
    axios
    .post(`/item/bookmark/${itemId}`, {}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      likeList[idx] = !likeList[idx];
      setLikeFlag(false);
      })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: '관심 등록이 불가합니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
    });
  };

  const cancelBookmark = (itemId, idx) => {
    axios
    .delete(`/item/bookmark/${itemId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      likeList[idx] = !likeList[idx];
      setLikeFlag(true);
      })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: '관심 등록 취소 불가합니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
    });
  };

  const goToDetail = (itemId) => {
    history.push(`/detail/${itemId}`);
  };

  const goToRent = (itemId) => {
    history.push(`/rent/${itemId}`);
  };

  return wishProduct.map((product, idx) => {
    return (
      <div key={idx}>
        <div className="wish-item-list">
          <img
            src={product.itemImage ? product.itemImage : noImage}
            className="wish-item-icon"
            alt="product-image"
            onClick={() => {
              goToDetail(product.itemId);
            }}
          ></img>
          <div
            className="wish-item-vertical"
            onClick={() => {
              goToDetail(product.itemId);
            }}
          >
            <div className="wish-item-title">{product.itemName}</div>
            <span>{product.itemAddress}</span>
            <div className="wish-item-price">{product.itemPrice} 원</div>
          </div>
          <div>
            {likeList[idx] ? (
              <img src={likeIcon} className="wish-item-bookmark" alt="like" onClick={() => cancelBookmark(product.itemId, idx)}></img>
            ) : (
              <img src={unlikeIcon} className="wish-item-bookmark" alt="unlike" onClick={() => addBookmark(product.itemId, idx)}></img>
            )}
          </div>
        </div>
      </div>
    );
  });
};

export default Wish;
