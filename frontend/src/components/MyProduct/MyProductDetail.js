import React from 'react'
import moment from 'moment';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';

import './MyProduct.css'
import Swal from 'sweetalert2';
import { Button } from "semantic-ui-react";
import tmpPic from '../../assets/icons/borrow.png'

const MyProductDetail = (props) => {
	console.log(props.data);
	const data = props.data;
	const flag = props.flag;

	let { selectDate } = useSelector(({ schedule }) => ({
		selectDate: schedule.selectDate
  }));

	const CancelRent = () => {
		const token = JSON.parse(window.localStorage.getItem("token"));
		axios
        .delete(`/deal/${data.dealId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
					props.cancelRentFlag(true);
					Swal.fire({
						title: "Cancel!",
						text: "예약 취소가 되었습니다.",
						icon: "success",
						confirmButtonText: "OK!",
						confirmButtonColor: "#497c5f",
					})
        })
        .catch((error) => {
          console.log(error);
        });
	}

	return (
		<div className="mpd-card">
    <div className="mpd-content">
		 			<img className="mpd-product-img" src={data.itemImage[0]} alt="product-img"/>
		 	<div className="mpd-product-info">
				<div className="mpd-product-name">
					{data.itemName}
					{selectDate === data.dealEndDate ?
					<div className="mpd-product-rent-falg">
							회수예정
					</div> :
					null
						}
				</div>
					<div className="mpd-product-date">
						<div>대여일 {data.dealStartDate}</div>
						<div>회수일 {data.dealEndDate}</div>
					</div>
					<div className="mpd-owner-name">
						{flag ?
							<>{data.itemSellerNickname}</>
							: (
							<>{data.itemBuyerNickname}</>
						)}
					</div>
					{moment().format('YYYY-MM-DD') < data.dealStartDate && flag === false ?
						<Button className="mpd-rent-button" onClick={CancelRent}>
							예약 취소
						</Button> :
						<div className="mpd-rent-button"></div>
					}
		 	</div>
    </div>
  </div>
	)
}

export default MyProductDetail
