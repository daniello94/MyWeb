import styles from "../views/MyInput.module.scss";

const MyInput = (props) => {
    return (
        <input 
        className={styles[props.isError ? "error":'']}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}/>
    )
}
export default MyInput;