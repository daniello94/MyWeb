import React, { useState } from "react";
import { Link } from "react-router-dom";
/* style media and icons */
import styles from "../views/Menu.module.scss";
import { BiMenu, BiX,BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import logoCompany from "../media/picture/logo.jpg"
/* components */
import Container from "../components/Container";

export default function Menu(props) {
    const [isActive, setActive] = useState("close");
    const [isClose, setClose] = useState("open");


    const logOut = () => {
        localStorage.clear();
        setInterval();
    };

    const menuHamburgerStan = () => {
        if (isActive === "open") {
            setActive("close")
            setClose("open")
        } else if (isActive === "close") {
            setActive("open")
            setClose("close")
        }
    };


    return (
        <Container thirdContainer={true}>
            <nav className={styles.mainNav}>
                <div className={styles[isClose]} onClick={() => menuHamburgerStan()}>
                    <BiMenu className={styles.iconOpen} />
                </div>
                <div className={styles[isActive]}>
                    <div className={styles.contentOpenMenu}>
                        <div className={styles.closeMobileHamburger} onClick={() => menuHamburgerStan()}>
                            <BiX className={styles.iconClose} />
                        </div>
                        <ul className={styles.menu}>
                            <li>
                                <Link onClick={() => menuHamburgerStan()} className={styles.mainItem} to="/">Home</Link>
                            </li>
                            <li>
                                <Link onClick={() => menuHamburgerStan()} className={styles.mainItem} to="/signup">Registration</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <Link className={styles.logoContent} to="/"><img src={logoCompany} onClick={() => {
                setActive("close")
                setClose("open")
            }} alt="pictureLogo" /></Link>

            {!props.userData && (
                <div className={styles.contentLinkMenu}>
                    <BsFillPersonFill className={styles.iconUser} onClick={props.userOption} />
                </div>
            )}

            {props.userData && (
                <Link className={styles.mainItem} to="/" onClick={logOut}><BiLogOut className={styles.iconLogOut}/></Link>
            )}
        </Container>

    )
}