import styles from "../views/Container.module.scss";

const Container = (props) => {
    return (
        <div className={
            `${styles.container}
             ${props.secundContainer && styles.secundContainer}
             ${props.thirdContainer && styles.thirdContainer}
             ${props.forContainer && styles.forContainer}
             ${props.fiveContainer && styles.fiveContainer}
             ${props.sixContainer && styles.sixContainer}
             ${props.sevenContainer && styles.sevenContainer}`
        }>{props.children}</div>
    )
}
export default Container;