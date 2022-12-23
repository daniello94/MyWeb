import styles from "../views/Container.module.scss";

const Container = (props) => {
    return (
        <div className={
            `${styles.container}
             ${props.secundContainer && styles.secundContainer}
             ${props.thirdContainer && styles.thirdContainer}`
        }>{props.children}</div>
    )
}
export default Container;