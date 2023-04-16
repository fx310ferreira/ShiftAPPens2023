import { useNavigate } from "react-router-dom";
import "./index.css";
import Sidebar from "../../../components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar/calendar";
import axios from "axios";

function CalendarView() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [schedules, setSchedules] = useState([]);

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
      // eslint-disable-next-line
    }, []);

      axios.get(process.env.REACT_APP_API + "/shedules").then((response) => {
        setSchedules(response.data);
        setState(true);
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <> 
      <Sidebar />
      <div className="calendarContainer">
        {state && <Calendar schedules={schedules}/>}
      </div>
    </>
  );
}

export default CalendarView;
