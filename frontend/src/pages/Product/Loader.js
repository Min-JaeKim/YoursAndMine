import { memo } from "react";
import './Product.css'

const Loader = () => {
  return( 
  <>
    <div className="product-loader">loading...</div>
  </>);
};

export default memo(Loader);
