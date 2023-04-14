import styles from "./input.module.css"

export default function Input(props) {
  return (
      <div className={props.error ? styles.inputError : styles.input}>
        <p>{props.header}</p>
        <input id={props.id} placeholder={props.placeholder} type={props.type} value={props.value} onChange={props.onChange} onBlur={props.onBlur}/>
        {props.error && <p className={styles.error}>{props.errorText}</p>}
      </div>
  );
}