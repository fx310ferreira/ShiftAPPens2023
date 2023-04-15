import { useState } from "react";
import "./index.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const handlePrev = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const days = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
    const currentDate = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];

        // Add empty cells for days before the first day of the month
    for (let i = 0; i < 7; i++) {
        daysArray.push(<div key={`empty_${i}`} className="week-day">{days[i]}</div>);
    }

    // Add empty cells for days before the first day of the month
    for (let i = firstDayOfMonth-1; i >= 0; i--) {
      daysArray.push(<div key={`empty_${i+7}`} className="empty-cell">{new Date(currentYear, currentMonth, 0).getDate()-i}</div>);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const isCurrentDay = currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() && i === currentDate.getDate();
      daysArray.push(
        <div key={i} className={`calendar-cell ${isCurrentDay ? "current-day" : ""}`}>
          {i}
        </div>
      );
    }
    let i = 1;
    while (daysArray.length < 49) {
      daysArray.push(<div key={`empty_${daysArray.length}`} className="empty-cell">{i++}</div>);
    }

    for (let i = 0; i < 7; i++) {
        daysArray.push(<div key={`empty_${i+49}`} className="filler-cell-x"></div>);
    }

    return daysArray;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>
          {date.toLocaleString("pt-PT", { month: "long", year: "numeric" }).charAt(0).toUpperCase() + date.toLocaleString("pt-PT", { month: "long", year: "numeric" }).slice(1)}
        </h2>
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="calendar-body">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;