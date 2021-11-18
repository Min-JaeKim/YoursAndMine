import "./MyProduct.css";
import "../Wish/Wish.css";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import noImage from "../../assets/image/no-image.jpg";

import axios from "../../api/axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// 등록한 대여제품
const MyProduct = (props) => {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [radioGroups, setRadioGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`/user/item/give`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProduct(response.data);
        const groups = {};
        response.data.forEach((p) => {
          groups[p.itemId] = p.itemActive === "Y" ? true : false;
        });
        setRadioGroups(groups);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const isActive = (idx) => {
    const p = product[idx];
    setRadioGroups({ ...radioGroups, [p.itemId]: !radioGroups[p.itemId] });
    // console.log(product[idx])
    // if (product[idx].status == "Y")
    //   product[idx].status = "N";
    // else product[idx].status = "Y";
    itemOnOff(idx);
    // console.log(product);
  };

  const itemOnOff = (idx) => {
    axios
      .put(
        `user/item/give/switch/${product[idx].itemId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {})
      .catch((err) => {});
  };

  const goToRentUserPage = (itemId) => {
    history.push(`/rentuser/${itemId}`);
  };

  const goToProductDetail = (itemId) => {
    history.push(`/detail/${itemId}`);
  };

  return (
    <div>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {product.map((item, idx) => {
            return (
              <div className="wish-item-list" key={idx}>
                <img
                  src={item.itemImage == null ? noImage : item.itemImage}
                  className="wish-item-icon"
                  alt="profile"
                ></img>
                <div className="wish-item-vertical" onClick={() => goToProductDetail(item.itemId)}>
                  <div className="wish-item-title">
                    <Link to={`/rentuser/${item.itemId}`}>{item.itemName}</Link>
                  </div>
                  <span>{item.itemAddress}</span>
                  <div className="wish-item-price">{item.itemPrice} 원</div>
                </div>
                <div>
                  <Button
                    className="mp-rent-user-button"
                    onClick={() => goToRentUserPage(item.itemId)}
                  >
                    대여자 보기
                  </Button>
                  {/* <button>대여자 보기?</button> */}
                  <label className="switch">
                    <input
                      type="checkbox"
                      onClick={() => isActive(idx)}
                      checked={radioGroups[item.itemId]}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyProduct;
