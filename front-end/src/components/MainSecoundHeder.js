import styles from "../views/MainHeder.module.scss";
import HederLine from "./HederLine";

const MainSecondHeder = (props) => {
    return (
        <>
        <h2 className={
            `${styles.hederH2}
             ${props.secundHeder && styles.secundHederH2}
             ${props.thirdHeder && styles.thirdHederH2}`
        }>{props.children}</h2>
        <HederLine/>
        </>
        
    )
}
export default MainSecondHeder;