import Button from "../Button/buttons";
import styles from "./sidebar.module.css"
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

export default function Sidebar(props) {
  const navigate = useNavigate();
  function onLogout(){
    localStorage.removeItem("acessToken");
    navigate("/login");
  }
  return (
      <div className={`${styles.sidebar} ${props.blue ? styles.sideblue : props.green? styles.sidegreen : props.purple? styles.sidepurple : ''}`}>
        <div className={styles.headers}>
          <CustomLink to="/calendar" header="1" blue>Calendário</CustomLink>
          <CustomLink to="/calendar/driving" header="" blue>Condução</CustomLink>
          <CustomLink to="/calendar/theory" header="" purple>Código</CustomLink>
          <CustomLink to="/calendar/times" header="" green>Horários </CustomLink>
          <CustomLink to="/examiners" header="1" blue>Examinadores</CustomLink>
          <CustomLink to="/examiners/times" header="" blue>Horários</CustomLink>
        </div>
          <Button onClick={onLogout} title="Logout"/>
      </div>
  );
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname})
  return(
    <li className={`${props.header ? styles.header : styles.subheader} ${isActive ? "" : styles.link} ${props.blue && isActive ? styles.blue : props.green && isActive ? styles.green : props.purple && isActive? styles.purple: ''}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}