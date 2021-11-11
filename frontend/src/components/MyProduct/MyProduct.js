import './MyProduct.css'
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from '../../api/axios';
import MyProductDetail from "./MyProductDetail";

import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'

const MyProduct = (props) => {

	const history = useHistory();

	let flag = props.flag;

	const [selectMonth, setSelectMonth] = useState('');
	const [selectDay, setSelectDay] = useState('');
	const [myProducts, setMyProducts] = useState([]);
	const [giveProducts, setGiveProducts] = useState([]);
	const [getProducts, setGetProducts] = useState([]);

	let {selectDate } = useSelector(({ schedule }) => ({
		selectDate: schedule.selectDate
  }));
	// const datas = [
	// 	{
	// 		id: 1,
	// 		itemName: '비모 피규어',
	// 		itemBuyerNickname: "민재민잼",
	// 		itemImage: "s3.file~~~.com",
	// 		dealStartDate: "2020-10-16",
	// 		dealEndDate: "2020-10-20",
	// 	},
	// 	{
	// 		id: 2,
	// 		itemName: '비모 피규어',
	// 		itemBuyerNickname: "민재민잼",
	// 		itemImage: "s3.file~~~.com",
	// 		dealStartDate: "2020-10-16",
	// 		dealEndDate: "2020-10-20",
	// 	},
	// 	{
	// 		id: 3,
	// 		itemName: '비모 피규어',
	// 		itemBuyerNickname: "민재민잼",
	// 		itemImage: "s3.file~~~.com",
	// 		dealStartDate: "2020-10-16",
	// 		dealEndDate: "2020-10-20",
	// 	},
	// ]

	useEffect(() => {
		if (selectDate) {

			setSelectMonth(selectDate.substring(5, 7));
			setSelectDay(selectDate.substring(8, 10));
			const token = JSON.parse(window.localStorage.getItem("token"));
			
			axios
			.get(`${process.env.REACT_APP_SERVER_BASE_URL}/user/day-schedule/${selectDate}`, {
				headers: {
					Authorization: "Bearer " + token,
				},
				})
				.then((response) => {
					setGiveProducts(response.data.반납일정);
					setGetProducts(response.data.회수일정);
					if (flag) {
						setMyProducts(response.data.반납일정);
					} else {
						setMyProducts(response.data.회수일정);
					}
				})
				.catch((error) => {
					Swal.fire({
						title: 'Error!',
						text: '일정 불러오기 실패!',
						icon: 'error',
						confirmButtonText: 'OK!',
						confirmButtonColor: '#497c5f'
					}).then((result) => {
						history.push('/signin');
					})
				});
		}
	}, [selectDate])

	useEffect(() => {
		setSelectMonth(moment().format('MM'));
		setSelectDay(moment().format('DD'));
		// setMyProducts(giveProductDates);
	}, [])

	useEffect(() => {
		if (flag) {
			setMyProducts(giveProducts);
		} else {
			setMyProducts(getProducts);
		}
  }, [flag]);

	return (
		<div className="All2">
			<div className="mp-selected-date-rent-list">
					{selectMonth}월 {selectDay}일
			</div>
			{flag
			// ? datas.map((data) => (
			? myProducts.map((data) => (
				<MyProductDetail flag={true} data={data} key={data.id}></MyProductDetail>
			)) : (
				// datas.map((data) => (
				myProducts.map((data) => (
					<MyProductDetail flag={false} data={data} key={data.id}></MyProductDetail>
			)))}
			
		</div>
	)
}

export default MyProduct
