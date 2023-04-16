import { useNavigate } from "react-router-dom";
import "./index.css";
import Sidebar from "../../../components/Sidebar/sidebar";
import { useEffect } from "react";
import axios from "axios";
import ExaminerCard from "../../../components/ExaminerCards/examinerCard";


function Examiners() {
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
      // eslint-disable-next-line
    }, []);


  return (
    <> 
      <Sidebar />
      <div className="examinersContainer">
        <ExaminerCard/>
        <ExaminerCard/>
        <ExaminerCard/>
      </div>
    </>
  );
}

export default Examiners;
