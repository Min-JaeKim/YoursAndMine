import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import { Input } from "semantic-ui-react";
import arrow from "../../assets/icons/next.png";
import "./Main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThumbNail from "../../components/ThumbNail/ThumbNail";
import axios from "../../api/axios";
import SearchInput from "../../components/SearchInput/SearchInput";

const Main = () => {
  const [nearProduct, setNearProduct] = useState([]);
  const [rentProduct, setRentProduct] = useState([]);
  const [nearProdcutCount, setNearProdcutCount] = useState([]);
  const [rentProductCount, setRentProductCount] = useState([]);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`/item`, {
        // headers: {
        //   Authentication: "Bearer " + token,
        // },
      })
      .then((response) => {
        console.log(response);
        setNearProduct(response.data);
        if (response.data.length >= 3) {
          setNearProdcutCount(3);
        } else {
          setNearProdcutCount(response.data.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/user/item/take`)
      .then((response) => {
        setRentProduct(response.data);
        if (response.data.length >= 3) {
          setRentProductCount(3);
        } else {
          setRentProduct(response.data.length);
        }
      })
      .catch((error) => {});
  }, []);

  // const NextArrow = (props) => {
  //   const { className, style, onClick } = props;
  //   return (
  //     <img
  //       src={arrow}
  //       alt="arrow"
  //       className={className}
  //       style={{ ...style, display: "block" }}
  //       onClick={onClick}
  //     />
  //   );
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const responsiveSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: nearProdcutCount,
    slidesToScroll: nearProdcutCount,
    initialSlide: 0,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: nearProdcutCount,
          slidesToScroll: nearProdcutCount,
          infinite: true,
        },
      },
    ],
  };

  const responsiveSettings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: rentProductCount,
    slidesToScroll: rentProductCount,
    initialSlide: 0,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: rentProductCount,
          slidesToScroll: rentProductCount,
          infinite: true,
        },
      },
    ],
  };

  const productCarousel = (productItem) => {
    return productItem.map((product, idx) => {
      return (
        <div className="product-carousel-box" key={idx}>
          <ThumbNail product={product} />
        </div>
      );
    });
  };
  return (
    <div className="main">
      {/* <Input className="main-search" icon="search" iconPosition="left" /> */}
      <SearchInput />
      <Slider {...settings}>
        <div className="carousel-page">
          <img alt="thumb-nail" src="https://picsum.photos/1000?random=1" />
          {/* <h3>한 번 쓰고 말건데</h3> */}
        </div>
        <div className="carousel-page">
          <img alt="thumb-nail" src="https://picsum.photos/1000?random=2" />

          {/* <h3>사기는 아깝고</h3> */}
        </div>
        <div className="carousel-page">
          <img alt="thumb-nail" src="https://picsum.photos/1000?random=3" />

          {/* <h3>안쓰는 물건인데</h3> */}
        </div>
        <div className="carousel-page">
          <img alt="thumb-nail" src="https://picsum.photos/1000?random=4" />

          {/* <h3>버리기는 아까울 때</h3> */}
        </div>
        <div className="carousel-page">
          <img alt="thumb-nail" src="https://picsum.photos/1000?random=5" />

          {/* <h3>빌리지하세요</h3> */}
        </div>
      </Slider>
      <div className="main-near-product">
        <div className="main-current-rent-header">
          <h4>가까운 위치에 있는 물건 소개 ✌🏻</h4>
          <Link to="/product" className="rent-header-link">
            {"전체 상품보기 >"}
          </Link>
        </div>

        <Slider {...responsiveSettings}>{productCarousel(nearProduct)}</Slider>
      </div>
      <div className="main-current-rent">
        <div className="main-current-rent-header">
          <h4>최근에 대여했어요 ✌🏻</h4>
          <Link to="/tradelog" className="rent-header-link">
            {"대여내역 보기 >"}
          </Link>
        </div>

        <Slider {...responsiveSettings2}>{productCarousel(rentProduct)}</Slider>
      </div>
    </div>
  );
};

export default Main;
