import { memo, useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "../../api/axios";
import Item from "./Item";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const AppWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  .Target-Element {
    width: 100vw;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;

const Test = () => {
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1]);
  // const [cnt, setCnt] = useState(-1);
  const token = JSON.parse(window.localStorage.getItem("token"));
  let cnt = -1;

  // useEffect(() => {
  //   setIsLoaded(true);
  //   setCnt(cnt+1);
  //   if(token != null && token != ""){
  //     axios
  //         .get(`/item?page=${cnt}&size=3&sort=itemModifiedTime,DESC`, {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         })
  //         .then((response) => {
  //           setItemLists((itemLists) => itemLists.concat(response.data));
  //           console.log('itemLists');
  //           console.log(itemLists);
  //           // setItemLists((response.data) => itemLists.concat(response.data));
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   } else{
  //     axios
  //         .get(`/item?page=0&size=5&sort=itemModifiedTime,DESC`)
  //         .then((response) => {
  //           setItemLists((itemLists) => itemLists.concat(response.data));
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //       }
  //       setIsLoaded(false);
  // }, []);


  useEffect(() => {
    console.log(itemLists);
  }, [itemLists]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    cnt += 1;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if(token != null && token != ""){
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
          .catch((error) => {
            console.log(error);
          });
    } else{
      axios
          .get(`/item?page=0&size=5&sort=itemModifiedTime,DESC`)
          .then((response) => {
            setItemLists((itemLists) => itemLists.concat(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // setItemLists((itemLists) => itemLists.concat(Items));
    setIsLoaded(false);
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
      console.log(55555555555555);
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
          return <ProductCard product={v} key={v.itemId} />
          // return <Item number={i + 1} key={i} />;
        })}
        <div ref={setTarget}>{isLoaded && <Loader />}</div>
      {/* </AppWrap> */}
    </>
  );
};

export default memo(Test);
