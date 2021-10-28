import React, { useEffect, useState } from "react";
import userActions from "../../redux/actions/userAction";
import ProductCard from "./ProductCard";
import axios from "../../api/axios";

function ProductList() {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get(`/item`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {products
        ? products.map((product) => (
            <ProductCard product={product} key={product.itemId}></ProductCard>
          ))
        : null}
    </div>
  );
}

export default ProductList;
