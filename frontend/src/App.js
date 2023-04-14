import './index.css';
import Login from './Auth/Login/login';
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg"
import LoginIMT from './Auth/LoginIMT/loginIMT';

function App() {
  return (
    <>
      <div className="logo">
        <Logo width="5rem" />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/imt" element={<LoginIMT />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  </>
  );
}

export default App;
