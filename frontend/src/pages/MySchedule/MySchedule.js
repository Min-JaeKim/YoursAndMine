import axios from "axios";
import React, { useState, useEffect } from "react";

import { Button } from "semantic-ui-react";
import "./MySchedule.css";
import Calendar from "../../components/MyCalendar/MyCalendar"
import MyProduct from "../../components/MyProduct/MyProduct"

const MySchedule = () => {

	useEffect(() => {
		
	}, [])


	return (
		<div>
		<div className="select-button">
			<Button className="rent-button">
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
