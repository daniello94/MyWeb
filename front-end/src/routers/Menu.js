import React, { useState } from "react";
import { Link } from "react-router-dom";
/* style media and icons */
import styles from "../views/Menu.module.scss";
import { BiMenu, BiX, BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import logoCompany from "../media/picture/logo.jpg"
/* components */
import Container from "../components/Container";
import MyLink from "../components/MyLink";

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
                                <MyLink onClick={() => menuHamburgerStan()} to="/">Home</MyLink>
                            </li>
                            <li>
                                <MyLink onClick={() => menuHamburgerStan()} to="/">O nas</MyLink>
                            </li>
                            {props.userData && (
                                <li>
                                    <MyLink onClick={() => menuHamburgerStan()} to="/delate">Usuń konto</MyLink>
                                </li>
                            )}
                            {(props.userData?.user.role === "employee" || props.userData?.user.role === "admin") && (
                                <li>
                                    <MyLink onClick={() => menuHamburgerStan()} to="/administration">Panel Administracyjny</MyLink>
                                </li>
                            )}
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
                    <MyLink to="/signup" className={styles.iconUser} onClick={props.userOption}><BsFillPersonFill className={styles.iconUserLogin} /></MyLink>
                </div>
            )}

            {props.userData && (
                <div className={styles.contentNameAndLink}>
                    <div className={styles.userName}>
                        <p>Witaj {props.userData.user.personalData.firstName}</p>
                    </div>
                    <Link className={styles.mainItem} to="/" onClick={logOut}><BiLogOut className={styles.iconLogOut} /></Link>
                </div>
            )}
        </Container>
    )
}