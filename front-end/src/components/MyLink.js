import { Link } from "react-router-dom";
import styles from "../views/Button.module.scss";

const MyLink = (props) => {
    return (
        <Link
            className={`${styles.link}
                        ${props.secondLink && styles.secondLink}
                        ${props.treeLink && styles.treeLink}
                        ${props.forLink && styles.forLink}
                        ${props.fiveLink && styles.fiveLink}
                        ${props.sixLink && styles.sixLink}`}
            to={props.to}
            onClick={props.onClick}
        >{props.children}</Link>
    )
}
export default MyLink;