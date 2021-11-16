import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import allActions from '../../redux/actions';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Input } from "semantic-ui-react";
import ThumbNail from "../../components/ThumbNail/ThumbNail";
import SearchInput from "../../components/SearchInput/SearchInput";

import "./Main.css";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrow from "../../assets/icons/next.png";

const Main = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  let { user, loginFlag, changeLocalFlag } = useSelector(({ user }) => ({
    loginFlag: user.login,
    user: user.user,
    changeLocalFlag: user.changeLocalFlag,
  }));

  const [nearProduct, setNearProduct] = useState([]);
  const [rentProduct, setRentProduct] = useState([]);
  const [nonMemberProduct, setNonMemberProduct] = useState([]);
  const [nearProdcutCount, setNearProdcutCount] = useState([]);
  const [rentProductCount, setRentProductCount] = useState([]);

  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios
        .get(`user/me`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          dispatch(allActions.userActions.loginUser(response.data));
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "다시 로그인해 주세요",
            icon: "error",
            confirmButtonText: "OK!",
            confirmButtonColor: "#497c5f",
          }).then((result) => {
            history.push("/signin");
          });
        });
    }
  }, [])

  useEffect(() => {
    if (!loginFlag || !user?.userAddress) {
      axios
        .get(`/item?page=0&size=6&sort=itemModifiedTime,DESC`, {
        })
        .then((response) => {
          setNonMemberProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/item?page=0&size=3&sort=itemModifiedTime,DESC`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
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
          .get(`/user/item/take`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setRentProduct(response.data);
            if (response.data.length >= 3) {
              setRentProductCount(3);
            } else {
              setRentProductCount(response.data.length);
            }
          })
          .catch((error) => {});
    }

  }, [loginFlag])

  useEffect(() => {
    axios
        .get(`/item?page=0&size=3&sort=itemModifiedTime,DESC`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
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
  }, [changeLocalFlag])

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

  const productCarousel = (productItem, flag) => {
    return productItem.map((product, idx) => {
      return (
        <div className="product-carousel-box" key={idx}>
          <ThumbNail product={product} flag={flag}/>
        </div>
      );
    });
  };

  const remtProductCarousel = (productItem, flag) => {
    return productItem.map((product, idx) => {
      return (
        <div className="product-carousel-box" key={idx}>
          <ThumbNail product={product} flag={flag}/>
        </div>
      );
    });
  };

  const nonMemberCarousel = (productItem, flag) => {
    return productItem.map((product, idx) => {
      return (
        <div className="product-carousel-box" key={idx}>
          <ThumbNail product={product} flag={flag}/>
        </div>
      );
    });
  }

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleWindowResize);

  const spansSlow = document.querySelectorAll('.spanSlow');
  const spansFast = document.querySelectorAll('.spanFast');

  let width = window.innerWidth;

  function handleMouseMove(e) {
    let normalizedPosition = e.pageX / (width/2) - 1;
    let speedSlow = 100 * normalizedPosition;
    let speedFast = 200 * normalizedPosition;
    spansSlow.forEach((span) => {
      span.style.transform = `translate(${speedSlow}px)`;
    });
    spansFast.forEach((span) => {
      span.style.transform = `translate(${speedFast}px)`
    })
  }
  //we need to recalculate width when the window is resized
  function handleWindowResize() {
    width = window.innerWidth;
  }

  return (
    <div className="main">
      {/* <Input className="main-search" icon="search" iconPosition="left" /> */}
      <SearchInput />
    <div className="main-body">
      <div class="wrap">
      <div class="line">
        <div class="main-left">
          <div class="content">
            <span class="spanFast">YOURS</span>
          </div>
        </div>
        <div class="main-right">
          <div class="content">
            <span class="spanFast">YOURS</span>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="main-left">
          <div class="content">
            <span class="spanFast">AND</span>
          </div>
        </div>
        <div class="main-right">
          <div class="content">
            <span class="spanFast">AND</span>
          </div>
        </div>
        </div>
        <div class="line">
            <div class="main-left">
              <div class="content">
                <span class="spanFast">MINE</span>
              </div>
            </div>
            <div class="main-right">
              <div class="content">
                <span class="spanFast">MINE</span>
              </div>
            </div>
          </div>
          {/* <div class="line">
              <div class="left">
                <div class="content">
                  <span class="spanSlow">want</span>
                </div>
              </div>
              <div class="right">
                <div class="content">
                  <span class="spanSlow">want</span>
                </div>
              </div>
            </div> */}
        </div>
    </div>

      { !loginFlag || !user?.userAddress ?
      // {!user?.userAddress || (user?.userAddress && !user.userAddress) ?
      
        <div className="main-current-rent">
          <div className="main-current-rent-header">
            <h4>최근 등록된 물건 ✌🏻</h4>
            {/* <Link to="/product" className="rent-header-link">
               {"전체 상품보기 >"}
             </Link> */}
          </div>
          <div className="main-non-member-product">
            {nonMemberCarousel(nonMemberProduct, "3")}
          </div>
        </div>
         : 
         <>
        
         <div className="main-near-product">
           <div className="main-current-rent-header">
             <h4>가까운 위치에 있는 물건 소개 ✌🏻</h4>
             <Link to="/product" className="rent-header-link">
               {"전체 상품보기 >"}
             </Link>
           </div>
 
           <Slider {...responsiveSettings}>{productCarousel( nearProduct, "1")}</Slider>
         </div>
         <div className="main-current-rent">
           <div className="main-current-rent-header">
             <h4>최근에 대여했어요 ✌🏻</h4>
             <Link to="/tradelog" className="rent-header-link">
               {"대여내역 보기 >"}
             </Link>
           </div>
 
           <Slider {...responsiveSettings2}>{remtProductCarousel(rentProduct, "2")}</Slider>
         </div> </>

    }
    </div>
  );
};

export default Main;
