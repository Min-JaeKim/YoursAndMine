import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import dayjs from "dayjs";

const Rent = () => {
  const history = useHistory();
  const location = useLocation();
  const historyState = location.state;
  const token = JSON.parse(window.localStorage.getItem("token"));

  const stringToNum = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const pricePerDay = historyState.price;
  const today = new Date().toString().split(" ");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#C5D3CC",
      preview: {
        color: "#C5D3CC",
      },
    },
  ]);
  const [rentalStartYear, setrentalStartYear] = useState(today[3]);
  const [rentalStartMonth, setrentalStartMonth] = useState(stringToNum[today[1]]);
  const [rentalStartDay, setrentalStartDay] = useState(today[2]);
  const [rentalEndYear, setrentalEndYear] = useState(today[3]);
  const [rentalEndMonth, setrentalEndMonth] = useState(stringToNum[today[1]]);
  const [rentalEndDay, setrentalEndDay] = useState(today[2]);
  const [price, setPrice] = useState("0");
  const [axiosPrice, setAxiosPrice] = useState("0");

  const [web3, setWeb3] = useState("");
  const [accounts, setAccounts] = useState("");
  const [contract, setContract] = useState("");
  const [bliContract, setBliContract] = useState("");
  const [address, setAddress] = useState("");
  const [contractSuccess, setContractSuccess] = useState(false);

  const [disabledDates, setDisabledDates] = useState([]);
  const [disabledDatesFlag, setDisabledDatesFlag] = useState(false);

  const onChangeDate = (item) => {
    setState([item.selection]);
    const y1 = Number(item.selection["startDate"].toString().split(" ")[3]);
    const m1 = Number(stringToNum[item.selection["startDate"].toString().split(" ")[1]]);
    const d1 = Number(item.selection["startDate"].toString().split(" ")[2]);
    const y2 = Number(item.selection["endDate"].toString().split(" ")[3]);
    const m2 = Number(stringToNum[item.selection["endDate"].toString().split(" ")[1]]);
    const d2 = Number(item.selection["endDate"].toString().split(" ")[2]);
    setrentalStartYear(y1);
    setrentalStartMonth(m1);
    setrentalStartDay(d1);
    setrentalEndYear(y2);
    setrentalEndMonth(m2);
    setrentalEndDay(d2);

    const date1 = new Date(y1, m1, d1);
    const date2 = new Date(y2, m2, d2);

    const elapsedMSec = date2.getTime() - date1.getTime();
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
    setPrice(((elapsedDay + 1) * pricePerDay).toLocaleString());
    setAxiosPrice((elapsedDay + 1) * pricePerDay);
  };

  const buyProduct = () => {
    // let minABI = [
    //   // transfer
    //   {
    //     constant: false,
    //     inputs: [
    //       {
    //         name: "_to",
    //         type: "address",
    //       },
    //       {
    //         name: "_value",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "transfer",
    //     outputs: [
    //       {
    //         name: "success",
    //         type: "bool",
    //       },
    //     ],
    //     payable: false,
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    // ];
    // let contractAddress = process.env.COINBASE;
    // let contract = new web3.eth.Contract(minABI, contractAddress);
    // let value = web3.utils.toWei(String(axiosPrice), "ether");
    // contract.methods
    //   .transfer(historyState.ownerWallet, value)
    //   .send({ from: accounts[0] })
    //   .then((result) => {
    //     setContractSuccess(true);
    //   })
    //   .catch((err) => {
    //     alert("결제 실패");
    //   });
  };

  // useEffect(() => {
  //   if (contract !== "") {
  //     contract.balanceOf(accounts).then((result) => {});
  //   }
  // }, [contract]);

  // useEffect(() => {
  //   if (contractSuccess === true) {
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_SERVER_BASE_URL}/api/contract/save`,
  //         {
  //           endDate: String(rentalEndYear) + "-" + ("0" + String(rentalEndMonth)).slice(-2) + "-" + ("0" + String(rentalEndDay)).slice(-2),
  //           itemId: historyState.itemId,
  //           ownerId: historyState.ownerId,
  //           startDate:
  //             String(rentalStartYear) + "-" + ("0" + String(rentalStartMonth)).slice(-2) + "-" + ("0" + String(rentalStartDay)).slice(-2),
  //           totalPrice: price,
  //         },
  //         {
  //           headers: {
  //             Authentication: "Bearer " + token,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         alert("정상적으로 결제가 완료되었습니다.");
  //         history.push('/tradelog');
  //       })
  //       .catch((error) => {
  //         alert("결제가 정상적으로 이뤄지지 않았습니다.");
  //       });
  //   }
  // }, [contractSuccess]);

  // useEffect(() => {
  //   if (disabledDates.length !== 0 && disabledDatesFlag === false) {
  //     const tmp = disabledDates.map((x) => dayjs(x).toDate());
  //     setDisabledDates(tmp);
  //     setDisabledDatesFlag(true);
  //   }
  // }, [disabledDates]);

  return (
    <div>
      <div className="calendar">
        <DateRange
          editableDateInputs={true}
          onChange={onChangeDate}
          // onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          minDate={new Date()}
          disabledDates={disabledDates}
        />
      </div>
      <br />
      <div className="rent-date">
        <div className="rent-raental-box">
          <div>대여일</div>
          <br />
          <div className="rent-raental-date">
            {rentalStartYear}년 {rentalStartMonth}월 {rentalStartDay}일
          </div>
        </div>
        <div className="rent-return-box">
          <div>반납일</div>
          <br />
          <div className="rent-return-date">
            {rentalEndYear}년 {rentalEndMonth}월 {rentalEndDay}일
          </div>
        </div>
      </div>
      <div className="rent-estimated-price-box">
        <div className="rent-estimated-comment">예상주문금액</div>
        <div className="rent-nbutton-price">
          <div className="rent-next-button">
            <FontAwesomeIcon icon={faArrowCircleRight} size="2x" onClick={buyProduct} />
          </div>
          <div className="rent-price-krw">
            <div className="rent-estimated-price">{price}&nbsp;</div>
            <div className="rent-estimated-krw">BLI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
