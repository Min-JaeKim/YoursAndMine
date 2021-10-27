import React from 'react'
import { Button } from "semantic-ui-react";
import "./MySchedule.css";
import Calendar from "../../components/MyCalendar/MyCalendar"
import MyProduct from "../../components/MyProduct/MyProduct"

const MySchedule = () => {

	function checkLeapYear(year) {
		if(year % 400 === 0){
			return true;
		} else if (year % 100 === 0) {
			return false;
		} else if (year%4 === 0) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div>
		<div className="select-button">
			<Button className="rent-button">
			{/* <Button style={{ backgroundColor: "#F5F5F5", color: "black" }}> */}
				반납 일정
			</Button>
			<Button className="return-button" >
			{/* <Button style={{ backgroundColor: "#497C5F", color: "white" }} className="detail-mayment" > */}
				회수 일정
			</Button>
		</div>
		<div>

		<Calendar />
		</div>
		<div>

		<MyProduct />
		</div>
		</div>
	)
}

export default MySchedule
