import axios from "../../api/axios";
import "./MySchedule.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import allActions from '../../redux/actions';
import React, { useState, useEffect } from "react";

import Calendar from "../../components/MyCalendar/MyCalendar"
import MyProduct from "../../components/MyProduct/MyProduct"

import moment from 'moment';
import Swal from 'sweetalert2'

const MySchedule = () => {

	const history = useHistory();
  const dispatch = useDispatch();

	const [flag, setFlag] = useState(true); // true는 반납일정, false는 회수일정
	const [loading, setLoading] = useState(true);

	let { scheduleDates, giveProductDates, getProductDates } = useSelector(({ schedule }) => ({
    scheduleDates: schedule.scheduleDates,
    giveProductDates: schedule.giveProductDates,
    getProductDates: schedule.getProductDates,
  }));

	useEffect(() => {
		if (scheduleDates !== undefined) {
			setLoading(false);
		}
	}, [scheduleDates])

	return (
		<>
		{flag ? (
				<>
					<div className="select-button">
						<Button className="active-button" onClick={()=>setFlag(true)}>
							반납 일정
						</Button>
						<Button className="deactive-button" onClick={()=>setFlag(false)}>
							회수 일정
						</Button>
					</div>
					<div>
						<Calendar flag={true}/>
					</div>
					<div>
						<MyProduct flag={true}/>
					</div>
				</>
			) : (
				<>
					<div className="select-button">
						<Button className="deactive-button" onClick={()=>setFlag(true)}>
							반납 일정
						</Button>
						<Button className="active-button" onClick={()=>setFlag(false)}>
							회수 일정
						</Button>
					</div>
					
					<div>
						<Calendar flag={false}/>
					</div>
					<div>
						<MyProduct flag={false}/>
					</div>
				</>
			)
		}
		</>
	)
}

export default MySchedule
