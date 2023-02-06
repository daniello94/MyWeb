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
             ${props.sevenContainer && styles.sevenContainer}
             ${props.eightContainer && styles.eightContainer}
             ${props.ninthContainer && styles.ninthContainer}
             ${props.tenContainer && styles.tenContainer}
             ${props.elevenContainer && styles.elevenContainer}`
        }>{props.children}</div>
    )
}
export default Container;