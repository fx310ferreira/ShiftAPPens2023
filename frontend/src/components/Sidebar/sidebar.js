import styles from "./sidebar.module.css"
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

export default function Sidebar(props) {
  return (
      <div className={styles.sidebar}>
        <div className={styles.headers}>
          <CustomLink to="/calendar" header="1">Calendário</CustomLink>
          <CustomLink to="/calendar/driving" header="">Condução</CustomLink>
          <CustomLink to="/calendar/theory" header="">Código</CustomLink>
          <CustomLink to="/calendar/times" header="">Horários </CustomLink>
          <CustomLink to="/examiners" header="1">Examinadores</CustomLink>
          <CustomLink to="/examiners/times" header="">Horários</CustomLink>
        </div>
      </div>
  );
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname})
  return(
    <li className={`${props.header ? styles.header : styles.subheader} ${isActive ? styles.activeLink : styles.link}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}