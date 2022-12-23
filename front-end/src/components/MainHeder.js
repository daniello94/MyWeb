import styles from "../views/MainHeder.module.scss";
import HederLine from "./HederLine";

const MainHeder = (props) => {
    return (
        <>
        <h1 className={
            `${styles.heder}
             ${props.secundHeder && styles.secundHeder}
             ${props.thirdHeder && styles.thirdHeder}`
        }>{props.children}</h1>
        <HederLine/>
        </>
        
    )
}
export default MainHeder;