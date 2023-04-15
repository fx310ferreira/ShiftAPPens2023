import { useNavigate } from "react-router-dom";
import "./index.css";
import Sidebar from "../../../components/Sidebar/sidebar";
import { useState } from "react";
import Calendar from "../../../components/Calendar/calendar";

function CalendarDriving() {
  return (
    <> 
      <Sidebar/>
      <div className="calendarContainer">
        <Calendar/>
      </div>
    </>
  );
}

export default CalendarDriving;
