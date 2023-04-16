import { useNavigate } from "react-router-dom";
import "./index.css";
import Sidebar from "../../../components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar/calendar";
import axios from "axios";

function CalendarDriving() {
  const schedules = [
    {"start": "2023-03-31T13:45:30", "end": "2023-04-15T14:45:30", "status": "drive"},
    {"start": "2023-04-30T13:45:30", "end": "2023-04-15T14:45:30", "status": "code"},
    {"start": "2023-04-28T13:45:30", "end": "2023-04-15T14:45:30", "status": "available"},
    {"start": "2023-04-29T13:45:30", "end": "2023-04-15T14:45:30", "status": "available"},
    {"start": "2023-04-30T13:45:30", "end": "2023-04-15T14:45:30", "status": "available"},
    {"start": "2023-04-27T13:45:30", "end": "2023-04-15T14:45:30", "status": "available"},
    {"start": "2023-04-26T13:45:30", "end": "2023-04-15T14:45:30", "status": "available"},
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("acessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.get(process.env.REACT_APP_API + "/exams", {headers: {
      Authorization : token}}).then((response) => {
        console.log(response.data);
      }).catch(err =>{
        console.log(err)
        // localStorage.clear();
        // navigate("/login")
      })
    }, []);

  return (
    <> 
      <Sidebar/>
      <div className="calendarContainer">
        <Calendar schedules={schedules}/>
      </div>
    </>
  );
}

export default CalendarDriving;
