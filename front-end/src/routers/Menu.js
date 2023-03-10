import React, { useState} from "react";
import { Link } from "react-router-dom";
/* style media and icons */
import styles from "../views/Menu.module.scss";
import { BiMenu, BiX, BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import logoCompany from "../media/picture/logo.jpg"
/* components */
import Container from "../components/Container";
import MyLink from "../components/MyLink";
import Button from "../components/Button";

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
            <div className={styles[(props.menuAdministrationPanel === true && "oderMenu") || props.activeClassMenu]}>
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
                                    <MyLink forLink={props.activeClassMenu === "initialClass" && true} onClick={() => menuHamburgerStan()} to="/"><span>Home</span></MyLink>
                                </li>
                                <li>
                                    <MyLink forLink={props.activeClassMenu === "initialClass" && true} onClick={() => menuHamburgerStan()} to="/"><span>O nas</span></MyLink>
                                </li>
                                <li>
                                    <MyLink forLink={props.activeClassMenu === "initialClass" && true} onClick={() => menuHamburgerStan()} to="/toolList"><span>Oferta</span></MyLink>
                                </li>
                                {props.userData && (
                                    <li>
                                        <MyLink forLink={props.activeClassMenu === "initialClass" && true} onClick={() => menuHamburgerStan()} to="/delate"><span>Usu?? konto</span></MyLink>
                                    </li>
                                )}
                                {(props.userData?.user.role === "employee" || props.userData?.user.role === "admin") && (
                                    <li>
                                        <MyLink forLink={props.activeClassMenu === "initialClass" && true} onClick={() => menuHamburgerStan()} to="/administration"><span>Panel Administracyjny</span></MyLink>
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
                        <Button forLink={props.activeClassMenu === "initialClass" && true}  className={styles.iconUser} onClick={props.userOption}><BsFillPersonFill className={styles.iconUserLogin} /></Button>
                    </div>
                )}

                {props.userData && (
                    <div className={styles.contentNameAndLink}>
                        <div className={styles.userName}>
                            <p>Witaj {props.userData.user.personalData.firstName} {props.userData.user.dataCompany.nameCompany}</p>
                        </div>
                        <Link className={styles.mainItem} to="/" onClick={logOut}><BiLogOut className={styles.iconLogOut} /></Link>
                    </div>
                )}
            </div>
        </Container>
    )
}