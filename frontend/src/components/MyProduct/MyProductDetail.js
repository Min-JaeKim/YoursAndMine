import React from 'react'
import './MyProduct.css'
import { Button } from "semantic-ui-react";
import tmpPic from '../../assets/icons/borrow.png'

const MyProductDetail = (props) => {
	const data = props.data;

	return (
		<div class="mpd-card">
    <div class="mpd-content">
		 			<img className="mpd-product-img" src={tmpPic} alt="product-img"/>
		 	<div className="mpd-product-info">
				<div className="mpd-product-name-rent-flag">
					<div className="mpd-product-name">
						{data.itemName}
					</div>
					<div className="mpd-product-rent-falg">

						회수예정
					</div>
				</div>
					<div className="mpd-product-date">
						<div>대여일 {data.dealStartDate}</div>
						<div>회수일 {data.dealEndDate}</div>
					</div>
					<div className="mpd-owner-name">
						{data.itemBuyerNickname}
					</div>
		 	</div>
			 <Button className="mpd-rent-button">
				예약 취소
			</Button>
    </div>
  </div>
	)
}

export default MyProductDetail
