import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import User from '../../assets/image/user.png'
import './Detail.css'
import unlikeIcon from '../../assets/icons/wish.png'
import likeIcon from '../../assets/icons/wish-on.png'
import { useHistory } from 'react-router';
import { Button } from "semantic-ui-react";
import axios from 'axios';


export const Detail = () => {
	const history = useHistory();
	const { pNo } = useParams();
	const [detail, setDetail] = useState({})
	const [loading, setLoading] = useState(true);
	const [like, setLike] = useState(false);

	useEffect(() => {

		const token = JSON.parse(window.localStorage.getItem('token'))
		axios
			.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/item/detail/${pNo}`, {
				headers: {
					Authentication:
						"Bearer " + token,
				}
			}
			)
			.then((response) => {
				setDetail(response.data);
				setLoading(false);
				setLike(response.data.bookmark);
				console.log(response.data)
			})
			.catch((error) => {
				alert('상품 내역이 존재하지 않습니다.')
				history.push('/');
			})
	}, [])

	const onSelectProduct = () => {
		history.push({
			pathname: '/rent',
			state: {
				itemId: detail.itemId,
				ownerWallet: detail.owner.wallet,
				ownerId: detail.owner.uid,
				price: detail.price,
			}});
	}

	const onLike = (e) => {
		setLike(true)
		const token = JSON.parse(window.localStorage.getItem('token'))
		axios
			.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/bookmark/${detail.itemId}`, {}, {
				headers: {
					Authentication:
						"Bearer " + token,
				},
			})
			.then((response) => {
			})
			.catch((error) => {
				alert("찜버튼을 다시 눌러 주세요.");
			})
  }

	const onUnLike = (e) => {
		setLike(false)
		const token = JSON.parse(window.localStorage.getItem('token'))
		axios
			.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/api/bookmark/${detail.itemId}`, {
				headers: {
					Authentication:
						"Bearer " + token,
				},
			})
			.then((response) => {
			})
			.catch((error) => {
				alert("찜버튼을 다시 눌러 주세요.");
			})
  }

	return (
		<div>
			{loading ? <>loading...</> :
				<>
				{/* <Button style={{ backgroundColor: "#497C5F", color: "white" }} className="detail-mayment" onClick={onSelectProduct}>
								삭제
							</Button> */}
					<img src={detail.imgSrc[0]} alt="product" className="detail-product" />
					<div className="detail-profile">
						<img src={detail.owner.image} alt="product" className="detail-user-icon" />
						<div className="detail-user-info">
							<div className="detail-user-name">{detail.owner.username}</div>
							<div className="detail-user-address">{detail.position}</div>
						</div>
						<div className="detail-like">
							{like ?
							<img src={likeIcon} alt="likeIcon" className="detail-like-icon" onClick={onUnLike}/>
							:
							<img src={unlikeIcon} alt="likeIcon" className="detail-like-icon" onClick={onLike}/>}
							<div>관심 등록</div>
						</div>
					</div>
					<br />
					<div className="detail-box">제품 상세</div>
					<br />
					<div className="detail-product-detail">

						<div className="detail-product-name">{detail.itemname}</div>
						<div className="detail-product-category-time">{detail.category}</div>
						<br /><br />
						<div>{detail.description}

						</div>
					</div>
					<div className="detail-inquire-buy">
						<div className="detail-oneday-price">
							<div className="detail-price">{detail.price} BLI</div>
							<div className="detail-day">1일 기준</div>
						</div>
						<div className="detail-button">
							<Button style={{ backgroundColor: "#F5F5F5", color: "black" }}>
								문의하기
							</Button>
							<Button style={{ backgroundColor: "#497C5F", color: "white" }} className="detail-mayment" onClick={onSelectProduct}>
								대여하기
							</Button>
						</div>
					</div>
				</>
			}
		</div>
	)
}
export default Detail;