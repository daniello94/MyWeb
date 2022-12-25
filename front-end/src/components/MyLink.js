import { Link } from "react-router-dom";
import styles from "../views/Button.module.scss";

const MyLink = (props) => {
    return (
        <Link
            className={`${styles.link}`}
            to={props.to}
            onClick={props.onClick}
        >{props.children}</Link>
    )
}
export default MyLink;