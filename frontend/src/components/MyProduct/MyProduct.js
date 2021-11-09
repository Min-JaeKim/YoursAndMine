import './MyProduct.css'
import moment from 'moment';
import MyProductDetail from "./MyProductDetail";

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const MyProduct = (props) => {

	let flag = props.flag;

	const [selectMonth, setSelectMonth] = useState('');
	const [selectDay, setSelectDay] = useState('');
	const [myProducts, setMyProducts] = useState([]);

	let {giveProductDates, getProductDates } = useSelector(({ schedule }) => ({
    giveProductDates: schedule.giveProductDates,
    getProductDates: schedule.getProductDates,
  }));

	const datas = [
		{
			id: 1,
			itemName: '비모 피규어',
			itemBuyerNickname: "민재민잼",
			itemImage: "s3.file~~~.com",
			dealStartDate: "2020-10-16",
			dealEndDate: "2020-10-20",
		},
		{
			id: 2,
			itemName: '비모 피규어',
			itemBuyerNickname: "민재민잼",
			itemImage: "s3.file~~~.com",
			dealStartDate: "2020-10-16",
			dealEndDate: "2020-10-20",
		},
		{
			id: 3,
			itemName: '비모 피규어',
			itemBuyerNickname: "민재민잼",
			itemImage: "s3.file~~~.com",
			dealStartDate: "2020-10-16",
			dealEndDate: "2020-10-20",
		},
	]

	useEffect(() => {
		setSelectMonth(moment().format('MM'));
		setSelectDay(moment().format('DD'));
		setMyProducts(giveProductDates);
	}, [])

	useEffect(() => {
		setSelectMonth(moment().format('MM'));
		setSelectDay(moment().format('DD'));
		if (flag) {
			setMyProducts(giveProductDates);
		} else {
			setMyProducts(getProductDates);
		}
  }, [flag]);

	return (
		<div className="All2">
			<div className="mp-selected-date-rent-list">
					{selectMonth}월 {selectDay}일
			</div>
			{flag
			? datas.map((data) => (
			// ? myProducts.map((data) => (
				<MyProductDetail flag={true} data={data} key={data.id}></MyProductDetail>
			)) : (
				datas.map((data) => (
				// myProducts.map((data) => (
					<MyProductDetail flag={false} data={data} key={data.id}></MyProductDetail>
			)))}
			
		</div>
	)
}

export default MyProduct
