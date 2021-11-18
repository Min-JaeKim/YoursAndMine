import { memo, useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1]);
  const [prevCnt, setPrevCnt] = useState(-1);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const token = JSON.parse(window.localStorage.getItem("token"));
  let cnt = -1;
  // let loadingFlag = true;

  useEffect(() => {
    // console.log('length');
    // console.log(prevCnt, itemLists.length);
    if (prevCnt !== itemLists.length) {
      setPrevCnt(itemLists.length);
    } else {
      setLoadingFlag(false);
    }
    // console.log(itemLists);
  }, [itemLists]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    cnt += 1;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (token != null && token != "") {
      axios
        .get(`/item?page=${cnt}&size=3&sort=itemModifiedTime,DESC`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setItemLists((itemLists) => itemLists.concat(response.data));
          // setItemLists((response.data) => itemLists.concat(response.data));
        })
        .catch((error) => {});
    } else {
      axios
        .get(`/item?page=${cnt}&size=3&sort=itemModifiedTime,DESC`)
        .then((response) => {
          setItemLists((itemLists) => itemLists.concat(response.data));
        })
        .catch((error) => {});
    }
    setIsLoaded(false);
    // setItemLists((itemLists) => itemLists.concat(Items));
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {/* <AppWrap> */}
      {itemLists.map((v, i) => {
        return <ProductCard product={v} key={v.itemId} />;
        // return <Item number={i + 1} key={i} />;
      })}
      {loadingFlag ? <div ref={setTarget}>{isLoaded && <Loader />}</div> : null}
      {/* </AppWrap> */}
    </>
  );
};

export default memo(ProductList);

// import React, { useEffect, useState, useRef } from "react";
// import userActions from "../../redux/actions/userAction";
// import ProductCard from "./ProductCard";
// import axios from "../../api/axios";
// import { useInView } from "react-intersection-observer";
// import Item from "./Item";
// import Loader from "./Loader";
// function ProductList() {
//   const [products, setProducts] = useState();
//   const [target, setTarget] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [itemLists, setItemLists] = useState([1]);

//   useEffect(() => {
//       console.log(itemLists);
//       }, [itemLists]);

//   useEffect(() => {
//     const token = JSON.parse(window.localStorage.getItem("token"));
//     if(token != null && token != ""){
//       axios
//           .get(`/item?page=0&size=12&sort=itemModifiedTime,DESC`, {
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           })
//           .then((response) => {
//             setProducts(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//     } else{
//       axios
//           .get(`/item?page=0&size=12&sort=itemModifiedTime,DESC`)
//           .then((response) => {
//             setProducts(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//     }

//   }, []);

//   const getMoreItem = async () => {
//       setIsLoaded(true);
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//       setItemLists((itemLists) => itemLists.concat(Items));
//       setIsLoaded(false);
//   };

//   const onIntersect = async ([entry], observer) => {
//       if (entry.isIntersecting && !isLoaded) {
//           observer.unobserve(entry.target);
//           await getMoreItem();
//           observer.observe(entry.target);
//       }
//   };

//   useEffect(() => {
//       let observer;if (target) {
//       observer = new IntersectionObserver(onIntersect, {
//           threshold: 0.4,
//       });
//       observer.observe(target);
//     }
//     return () => observer && observer.disconnect();
//       }, [target]);

//   return (
//     <div>
//       {products
//         ? products.map((product, idx) => (
//             <ProductCard product={product} key={product.itemId}></ProductCard>
//           ))
//         : null}
//         <div ref={setTarget}>{isLoaded && <Loader />}</div>
//         {/*<AppWrap>*/}
//         {/*    {itemLists.map((v, i) => {*/}
//         {/*        return <Item number={i + 1} key={i} />;*/}
//         {/*    })}*/}
//         {/*    <div ref={setTarget}>{isLoaded && <Loader />}</div>*/}
//         {/*</AppWrap>*/}
//     </div>
//   );
// }

// export default ProductList;
