import React, { useEffect, useState } from "react";
import noImage from "../../assets/image/no-image.jpg";
import { Link } from "react-router-dom";
import "../Wish/Wish.css";
import "./MyProduct.css";
import axios from "axios";

const MyProduct = (props) => {
  const [product, setProduct] = useState([]);
  const [radioGroups, setRadioGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/item`, {
        headers: {
          Authentication: "Bearer " + token,
        },
      })
      .then((response) => {
        setProduct(response.data);
        const groups = {};
        response.data.forEach(p => {
          groups[p.itemId] = p.status === 'Y' ? true : false
        })
        setRadioGroups(groups);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const isActive = (idx) => {
    const p = product[idx]
    console.log(p)
    setRadioGroups({ ...radioGroups, [p.itemId]: !radioGroups[p.itemId] });
    // console.log(product[idx])
    // if (product[idx].status == "Y")
    //   product[idx].status = "N";
    // else product[idx].status = "Y";
    itemOnOff(idx);
    // console.log(product);
    console.log(radioGroups)
  };

  const itemOnOff = (idx) => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/item/active/${product[idx].itemId}`,
        {},
        {
          headers: {
            Authentication: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log("success");
      })
      .catch((err) => {
        console.log("fail");
      });
  };

  return (
    <div>
      {loading ? <>loading...</> :
        <>
          {product.map((item, idx) => {
            return (
              <div className="wish-item-list" key={idx}>
                <img src={item.image == null ? noImage : item.image} className="wish-item-icon" alt="profile"></img>
                <div className="wish-item-vertical">
                  <div className="wish-item-title">
                    <Link to={`/rentuser/${item.itemId}`}>{item.itemname}</Link>
                  </div>
                  <span>{item.position}</span>
                  <div className="wish-item-price">{item.price} BLI</div>
                </div>
                <div>
                  <label className="switch">
                    <input type="checkbox" onClick={() => isActive(idx)} checked={radioGroups[item.itemId]} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            )
          })}
        </>
      }
    </div>
  );
};

export default MyProduct;
