import { useNavigate } from "react-router-dom";
import "./index.css";
import Sidebar from "../../../components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar/calendar";
import axios from "axios";


function CalendarAvailable() {
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

    useEffect(() => {
      const values = {
       "status": "available",
       "month": 3,
       "year": 2023
     };  
     axios.post(process.env.REACT_APP_API + "/schedules/sym", values).then((response) => {
       setSchedules(response.data);
       setState(true);
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     })
   }, []);

  return (
    <> 
      <Sidebar green/>
      <div className="calendarContainer">
        {state && <Calendar schedules={schedules} green/>}
      </div>
    </>
  );
}

export default CalendarAvailable;
