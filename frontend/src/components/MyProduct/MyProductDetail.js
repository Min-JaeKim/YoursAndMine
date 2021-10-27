import React from 'react'
import tmpPic from '../../assets/icons/borrow.png'

const MyProductDetail = (props) => {
	console.log(props);
	return (
		<div className="card">
			{props.data.itemName}
		</div>
	)
}

export default MyProductDetail
