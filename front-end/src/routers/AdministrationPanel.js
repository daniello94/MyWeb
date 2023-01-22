import React, { useState, useEffect } from "react";
/* components and style */
import Button from "../components/Button";
import Container from "../components/Container";
import styles from "../views/AdministrationPanel.module.scss";
import MainHeder from "../components/MainHeder";
import MainSecondHeder from "../components/MainSecoundHeder";
/* routes */
import AddEmployee from "./AddEmployee";
import ListUser from "./ListUser";
import AddEquipment from "./AddEquipment";
import Orders from "./Orders";

export default function AdministrationPanel(props) {
    const { onIsOnPageChange } = props;
    const [views, setViews] = useState("");
    const [isOnPage, setIsOnPage] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.pathname;
        if (currentUrl === '/administration') {
            setIsOnPage(true);
            onIsOnPageChange(true);
        } else {
            setIsOnPage(false);
            onIsOnPageChange(false);
        }
    }, [isOnPage, onIsOnPageChange]);

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 3 && currentHour < 6) {
            return "Dobrego poranka!";
        } else if (currentHour >= 6 && currentHour < 12) {
            return "Dzień dobry!";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Miłego popołudnia!";
        } else if (currentHour >= 18 && currentHour < 24) {
            return "Dobrego wieczoru!";
        } else {
            return "Dobrej nocy!";
        }
    }

    return (
        <Container sevenContainer={true}>
            <MainHeder secundHeder={true}>Panel Administracyjny</MainHeder>
            <Container sixContainer={true}>
                <div className={styles.administrationNav}>
                    <nav>
                        <ul>
                            {props.userData.user.role === "admin" && (
                                <li>
                                    <Button onClick={() => setViews('addUser')} thirdBtn={true}>Dodaj pracownika</Button>
                                </li>
                            )}

                            <li>
                                <Button onClick={() => setViews('listUser')} thirdBtn={true}>Lista Uzytkowników</Button>
                            </li>
                            <li>
                                <Button onClick={() => setViews('addEquipment')} thirdBtn={true}>Urządzenia</Button>
                            </li>
                            <li>
                                <Button onClick={() => setViews('orders')} thirdBtn={true}>Zamówienia</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.viewsPanel}>
                    {views === "" && (
                        <MainSecondHeder>{getGreeting()}</MainSecondHeder>
                    )}
                    {views === "addUser" && (
                        <AddEmployee />
                    )}
                    {views === "listUser" && (
                        <ListUser userData={props.userData} />
                    )}
                    {views === "addEquipment" && (
                        < AddEquipment />
                    )}
                       {views === "orders" && (
                        < Orders />
                    )}
                </div>
            </Container>
        </Container>
    )
}