import "./MyCalendar.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import React, { useState, useEffect } from 'react'

import today from '../../assets/image/today.png'
import arrowLeft from '../../assets/icons/back.png'
import rentDatePic from '../../assets/image/rentDate.png'
import selectDate from '../../assets/image/selectDate.png'
import arrowRight from '../../assets/icons/arrow-right.png'
import returnDatePic from '../../assets/image/returnDate.png'

import axios from "../../api/axios";
import moment from 'moment';
import Swal from 'sweetalert2'

const MyCalendar = (props) => {

	const history = useHistory();
	let flag = props.flag;
	
  const [getMoment, setMoment]=useState(moment());
	const [dateStyle, setDateStyle] = useState("");
	const [selectDateFlag, setSelectDateFlag] = useState(false);
	const [selectMonth, setSelectMonth] = useState('');
	const [selectDay, setSelectDay] = useState('');

	const [redDay, setRedDay] = useState([]);
	const [grayDay, setGrayDay] = useState([]);
	const [giveDay, setGiveDay] = useState([]);
	const [giveDays, setGiveDays] = useState([]);
	const [getDay, setGetDay] = useState([]);
	const [getDays, setGetDays] = useState([]);
	
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
	
	useEffect(() => {
		setSelectMonth(moment().format('MM'));
		setSelectDay(moment().format('DD'));
  }, []);

	useEffect(() => {
		
		const token = JSON.parse(window.localStorage.getItem("token"));
    
    axios
    .get(`${process.env.REACT_APP_SERVER_BASE_URL}/user/month-schedule/${today.format('YYYY-MM-DD')}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      })
      .then((response) => {
				setGiveDay(response.data.반납날짜);
				setGiveDays(response.data.반납일정);
				setGetDay(response.data.회수날짜);
				setGetDays(response.data.회수일정);
				if (flag) {
					setRedDay(response.data.반납날짜);
					setGrayDay(response.data.반납일정);
				} else {
					setRedDay(response.data.회수날짜);
					setGrayDay(response.data.회수일정);
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

	}, [getMoment])

	useEffect(() => {
		if (flag) {
			setRedDay(giveDay);
			setGrayDay(giveDays);
		} else {
			setRedDay(getDay);
			setGrayDay(getDays);
		}
	}, [flag])

	const prevMonth =  () => {
		setMoment(getMoment.clone().subtract(1, 'month'));
	}

	const nextMonth = () => {
		setMoment(getMoment.clone().add(1, 'month'));
	}

	const onClickDate = (e) => {
		if (dateStyle !== ""){
			dateStyle.style.backgroundImage = "";
			setDateStyle(e.target);
		}
		if (e.target.firstElementChild !== null) {
			let tmp = e.target.firstElementChild;
			let childNode;
			while (tmp !== null){
				childNode = tmp;
				tmp = childNode.firstElementChild;
			}
			setDateStyle(childNode);
			childNode.style.backgroundImage = `url(${ selectDate })`;
			// setDateStyle(e.target.firstElementChild);
			// e.target.firstElementChild.style.backgroundImage = `url(${ selectDate })`;
		} else {
			setDateStyle(e.target);
			e.target.style.backgroundImage = `url(${ selectDate })`;
		}
	}

const calendarArr=()=>{

	let result = [];
	let week = firstWeek;
	for ( week; week <= lastWeek; week++) {
		result = result.concat(
			<tr key={week}>
				{
					Array(7).fill(0).map((data, index) => {
						let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성
						let day = days.format('D');
						if (day.length == 1){
							day = '\u00A0' + day;
						}
						// 오늘
						if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
							// 날짜
							if (redDay.includes(days.format('YYYY-MM-DD'))){
							// if (days.format('D') === returnDate){
								return(
									<td key={index} className="today-box" onClick={onClickDate}>
										<div className="return-date-set">
											<span>{day}</span>
											<img className="date-check" src={returnDatePic} alt="retrun-date"/>
										</div>
									</td>
								);
							} else if (grayDay.includes(days.format('YYYY-MM-DD'))) {
								// 일정
								return(
									<td key={index} className="today-box" onClick={onClickDate}>
										<div className="return-date-set">
											<span >{day}</span>
											{/* <span className={`${days.format('D')}`}>{days.format('D')}</span> */}
											<img className="date-check" src={rentDatePic} alt="rent-date"/>
										</div> 
									</td>
								);
							} else {
								// 아무 날도 아닐 때
									return(
											<td key={index} className="today-box" onClick={onClickDate}>
												<span>{day}</span>
												{/* <span className="">{days.format('D')}</span> */}
											</td>
									);
							}
						} else if(days.format('MM') !== today.format('MM')){
							return(
									<td key={index} >
										<td key={index} >
										<span ></span>
									</td>
									</td>
							);
						} else if (redDay.includes(days.format('YYYY-MM-DD'))){
						// } else if (rentDate.includes(days.format('D'))){
							return(
								<td key={index} className="available-date-box" onClick={onClickDate}>
									<div className="return-date-set">
										<span className={`${days.format('D')}`} >{day}</span>
										{/* <span className={`${days.format('D')}`} >{days.format('D')}</span> */}
										<img className="date-check" src={returnDatePic} alt="retrun-date"/>
									</div> 
								</td>
						);
						} else{
							return(
									<td key={index} className="available-date-box" onClick={onClickDate}>
										
										{ 
											grayDay.includes(days.format('YYYY-MM-DD')) ?
											// days.format('D') === returnDate ?
											<div className="return-date-set">
												<span >{day}</span>
												{/* <span className={`${days.format('D')}`}>{days.format('D')}</span> */}
												<img className="date-check" src={rentDatePic} alt="rent-date"/>
											</div> 
											:
											<span >{day}</span>
											// <span >{days.format('D')}</span>
										}
									</td>
							);
						}
					})
				}
			</tr>
		);
	}
	return result;
}
	
	return (
		<div className="All">
			<div>

				<div className="control">
				<img
							src={arrowLeft}
							alt="arrowLeft"
							width="30px"
							height="30px"
							className="post-month-button" onClick={prevMonth}
						/>
				<span className="year-month">{today.format('YYYY 년 MM 월')}</span>
				<img
							src={arrowRight}
							alt="arrowRight"
							width="30px"
							height="30px"
							className="prev-month-button" onClick={nextMonth}
						/>
					</div>
					<table>
						<tbody>
							{calendarArr()}
						</tbody>
					</table>
			</div>
		</div>
	);
}

export default MyCalendar
