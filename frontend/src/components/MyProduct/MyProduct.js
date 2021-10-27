import React from 'react'
import MyProductDetail from "./MyProductDetail";
import './MyProduct.css'

const MyProduct = () => {
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
	return (
		<div className="All2">
			{datas.map((data) => (
        <MyProductDetail data={data} key={data.id}></MyProductDetail>
      ))}
		</div>
	)
}

export default MyProduct
