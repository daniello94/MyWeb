import styles from "../views/HederLine.module.scss";

const HederLine = (props) => {
    return (
        <hr className={
            `${styles.hr}
             ${props.secundLine && styles.hr2}
             ${props.thirdLine && styles.hr3}`
        } />
    )
}
export default HederLine;