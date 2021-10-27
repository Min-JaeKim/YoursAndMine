import React, { useEffect, useState } from "react";
import likeIcon from "../../assets/icons/wish-on.png";
import unlikeIcon from "../../assets/icons/wish.png";
import noImage from "../../assets/image/no-image.jpg";
import axios from "axios";

import "./Wish.css";
const Wish = ({ history }) => {
  const [wishProduct, setWishProduct] = useState([]);
  const [likeFalg, setLikeFlag] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("token"));
  let [likeList, setLikeList] = useState([]);
  // like = new Array(wishProduct.length).fill(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/bookmark`, {
        headers: {
          Authentication: "BEARER " + token,
        },
      })
      .then((response) => {
        setWishProduct(response.data);
        setLikeList(new Array(response.data.length).fill(true));
        setLikeFlag(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [likeFalg]);

  const addBookmark = (itemId, idx) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/bookmark/${itemId}`,
        {},
        {
          headers: {
            Authentication: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        likeList[idx] = !likeList[idx];
        setLikeFlag(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelBookmark = (itemId, idx) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_BASE_URL}/api/bookmark/${itemId}`, {
        headers: {
          Authentication: "BEARER " + token,
        },
      })
      .then((response) => {
        likeList[idx] = !likeList[idx];
        setLikeFlag(true);
      })
      .catch((error) => {
        console.log(error);
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
            src={product.image ? product.image : noImage}
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
            <div className="wish-item-title">{product.itemname}</div>
            <span>{product.position}</span>
            <div className="wish-item-price">{product.price} BLI</div>
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
