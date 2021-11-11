import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axios from "../../api/axios";
import { useHistory } from "react-router";
import allActions from "../../redux/actions";
const { kakao } = window;

const Location = ({ searchPlace }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);
  const [address, setAddress] = useState("");
  let sigungu;

  const handleClick = async (address) => {
    setAddress(address);
    const data = await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
        headers: { Authorization: "KakaoAK 3c8ffe0fda9423ae3d4595085463213e" },
      })
      .then((res) => {
        console.log(address);
        const location = res.data.documents[0];
        // console.log(location);
        // console.log(location?.address?.b_code);
        sigungu = location?.address?.b_code !== undefined ? location?.address?.b_code.slice(0, 5) : null;
        console.log(sigungu);
      });
    // console.log(data);
    // console.log(sigungu);
    const token = JSON.parse(window.localStorage.getItem("token"));
    const second = await axios
      .put(
        `/user/modify/address`,
        {
          userAddress: address,
          userSigunguCode: sigungu,
        },
        {
          headers: {
            Authentication: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        window.localStorage.setItem("token", JSON.stringify(response.data.split(" ")[1]));
        const userData = JSON.parse(window.localStorage.getItem("user"));
        userData.userAddress = address;
        window.localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(second);
    alert("주소가 변경되었습니다.");
    history.push("/");
  };

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i + " ";

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }
  }, [searchPlace]);

  return (
    <div>
      <div id="result-list" className="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: "20px" }}>
            {/* <span>{i + 1}</span> */}
            <div>
              <h5 style={{ cursor: "pointer" }} onClick={() => handleClick(item.address_name)}>
                {item.place_name}
              </h5>
              {item.road_address_name ? (
                <div>
                  <span style={{ cursor: "pointer" }} onClick={() => handleClick(item.road_address_name)}>
                    {item.road_address_name}
                  </span>
                  <br />
                  <span style={{ cursor: "pointer" }} onClick={() => handleClick(item.address_name)}>
                    {item.address_name}
                  </span>
                </div>
              ) : (
                <span style={{ cursor: "pointer" }} onClick={() => handleClick(item.address_name)}>
                  {item.address_name}
                </span>
              )}
              {/* <span>{item.phone}</span> */}
            </div>
            <br></br>
            <hr></hr>
          </div>
        ))}
        <br />
        <div id="pagination" className="pagination"></div>
        <br />
      </div>
    </div>
  );
};

export default Location;
