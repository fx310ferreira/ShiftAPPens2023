import './index.css';
import Login from './Views/Auth/Login/login';
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg"
import LoginIMT from './Views/Auth/LoginIMT/loginIMT';
import CalendarDriving from './Views/Calendars/Driving/driving';

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
        <Route path="/calendar" element={<CalendarDriving />} />
        <Route path="/calendar/driving" element={<CalendarDriving />} />
        <Route path="/calendar/theory" element={<CalendarDriving />} />
        <Route path="/calendar/times" element={<CalendarDriving />} />
        <Route path="/examiners" element={<CalendarDriving />} />
        <Route path="/examiners/times" element={<CalendarDriving />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  </>
  );
}

export default App;
