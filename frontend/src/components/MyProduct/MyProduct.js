import React, { useState, useEffect } from 'react'
import './MyProduct.css'
import moment from 'moment';
import MyProductDetail from "./MyProductDetail";

const MyProduct = () => {

	const [selectMonth, setSelectMonth] = useState('');
	const [selectDay, setSelectDay] = useState('');

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
  }, []);

	return (
		<div className="All2">
			<div className="mp-selected-date-rent-list">
					{selectMonth}월 {selectDay}일
				</div>
			{datas.map((data) => (
        <MyProductDetail data={data} key={data.id}></MyProductDetail>
      ))}
		</div>
	)
}

export default MyProduct
