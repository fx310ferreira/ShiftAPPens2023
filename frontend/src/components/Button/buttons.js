import styles from "./button.module.css";

export default function Button(props) {
  return (
       <button className={`${styles.Button}`} onClick={props.onClick} type={props.type}>{props.title}</button>
  );
}