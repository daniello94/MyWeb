import styles from "../views/Button.module.scss";

const Button = (props) => {
    return (
        <button className={
            `${styles.btn}
             ${props.secundBtn && styles.secundBtn}
             ${props.thirdBtn && styles.thirdBtn}
             ${props.forBtn && styles.forBtn}
             ${props.fiveBtn && styles.fiveBtn}
             ${props.forLink && styles.forLink}`
        } onClick={props.onClick}>{props.children}</button>
    )
}
export default Button;