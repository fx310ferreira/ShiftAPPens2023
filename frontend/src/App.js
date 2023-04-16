import './index.css';
import Login from './Views/Auth/Login/login';
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg"
import LoginIMT from './Views/Auth/LoginIMT/loginIMT';
import CalendarDriving from './Views/Calendars/Driving/driving';
import CalendarView from './Views/Calendars/Calendar/calendar';
import CalendarCode from './Views/Calendars/Code/code';
import CalendarAvailable from './Views/Calendars/Available/available';
import Examiners from './Views/Examiners/Examiners/examiners';

function App() {
  return (
    <>
      <div className="logo">
        <Logo width="5rem" />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/imt" element={<LoginIMT />} />
        <Route path="/login/school" element={<LoginIMT />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/calendar/driving" element={<CalendarDriving />} />
        <Route path="/calendar/theory" element={<CalendarCode />} />
        <Route path="/calendar/times" element={<CalendarAvailable />} />
        <Route path="/examiners" element={<Examiners />} />
        <Route path="/examiners/times" element={<CalendarView />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  </>
  );
}

export default App;
