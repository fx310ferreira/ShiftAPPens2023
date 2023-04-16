import { useState } from "react";
import "./index.css";
import Modal from "../Modal/modal";
import axios from "axios";

const Calendar = (props) => {
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const schedules = props.schedules;

  const handlePrev = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleClose = () => {
    setVisible(false);
  };

  const openModal = (id) => {
    setId(id);
    setVisible(true);
  };

  const elements = (day, month, year) => {
    const events = [];

    for (let j = 0; j < schedules.length; j++) {
      const currentDate = new Date(schedules[j].start)
      if (currentDate.getDate() === day && currentDate.getMonth() === month) {
        events.push(
          <span
            className={`event ${
              schedules[j].status === "drive"
                ? "blue"
                : schedules[j].status === "code"
                ? "purple"
                : "green"
            }`}
            onClick={() => {
              openModal(schedules[j]._id);
            }}
          >
            {schedules[j].status}
          </span>
        ); //change j to ID
      }
    }
    return events;
  };
  const value = {
    "email":"ola@adeus.com",
    "type":"student",
    "schedule": {
      "start": "2023-04-07T12:00:00", 
      "end": "2023-04-07T13:00:00",
      "status": "drive"
  }}

  const addSchedule = () =>{
    axios.post(process.env.REACT_APP_API + "/add/schedule", value).then((res)=>{
      //Temporaray
    }).catch((err)=>{
      console.log(err);
    })
  }

  const renderCalendar = () => {
    const days = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
    const currentDate = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const totalDaysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < 7; i++) {
      daysArray.push(
        <div key={`empty_${i}`} className="week-day">
          {days[i]}
        </div>
      );
    }

    // Add empty cells for days before the first day of the month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      let day = new Date(currentYear, currentMonth, 0).getDate() - i;
      daysArray.push(
        <div key={`empty_${i + 7}`} className="empty-cell">
          <span className="day">{day}</span> {elements(day, currentMonth-1, currentYear)}
        </div>
      );
    }

    // Add cells for each day of the month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const isCurrentDay =
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear() &&
        i === currentDate.getDate();
      daysArray.push(
        <div key={i} className={`calendar-cell`}>
          <span className={`${isCurrentDay ? "current-day" : "day"}`}>{i} </span>
          {elements(i, currentMonth, currentYear)}
        </div>
      );
    }
    let i = 1;
    while (daysArray.length < 49) {
      daysArray.push(
        <div key={`empty_${daysArray.length}`} className="empty-cell">
          <span className="day">{i}</span>
          {elements(i,currentMonth+1, currentYear)}
        </div>
      );
      i++;
    }

    for (let i = 0; i < 7; i++) {
      daysArray.push(
        <div key={`empty_${i + 49}`} className="filler-cell-x"></div>
      );
    }

    return daysArray;
  };
  return (
    <div className="calendar-container">
      <Modal show={visible} handleClose={handleClose}>
        <p>Modal</p>
        <p>event id {id}</p>
      </Modal>
      <div className="calendar-header">
        <h2 className={`calendar-header-title ${props.blue ? "titleblue" : props.green? "titlegreen" : props.purple? "titlepurple" : ''}`}>
          {date
            .toLocaleString("pt-PT", { month: "long", year: "numeric" })
            .charAt(0)
            .toUpperCase() +
            date
              .toLocaleString("pt-PT", { month: "long", year: "numeric" })
              .slice(1)}
        </h2>
        <button onClick={handlePrev} className={`calendar-header-button ${props.blue ? "buttonblue" : props.green? "buttongreen" : props.purple? "buttonpurple" : ''}`}>&lt;</button>
        <button onClick={handleNext} className={`calendar-header-button ${props.blue ? "buttonblue" : props.green? "buttongreen" : props.purple? "buttonpurple" : ''}`}>&gt;</button>
        {props.available &&
        <>
          <h2 className={`calendar-header-add titlegreen`}>Disponibilidade</h2>
          <button onClick={addSchedule} className={`calendar-header-button ${props.blue ? "buttonblue" : props.green? "buttongreen" : props.purple? "buttonpurple" : ''}`}>+</button>
        </>
        }
      </div>
      <div className="calendar-body">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;