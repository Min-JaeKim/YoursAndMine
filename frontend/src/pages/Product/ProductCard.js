import React from "react";
import "./Product.css";
import likeIcon from "../../assets/icons/like.png";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  return (
    <>
    {product?.itemId ?
      <Link to={{ pathname: `/detail/` + product.itemId, state: {} }}>
        <div>
          <div className="product-card">
            <div className="product-img">
              <img alt="product" src={product.itemImage} />
            </div>
            <div className="product-info">
              <div>{product.itemName}</div>
              <div>{product.itemAddress}</div>
              {/* <div>₩ {product.itemPrice}</div> */}
              <div>₩ {product.itemPrice.toLocaleString("ko-KR")}</div>
            </div>
            <div className="product-like">
              <img src={likeIcon} alt="like" />
              {product.bookmarkCount}
            </div>
          </div>
          <div className="underline">
            <hr></hr>
          </div>
        </div>
      </Link> : null
    }
    </>
  );
}
export default ProductCard;
