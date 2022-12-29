import React, { useState, useEffect } from "react"
import axios from "axios";
/* components and style */
import MainSecondHeder from "../components/MainSecoundHeder";
import Button from "../components/Button";
import styles from "../views/ListUser.module.scss";
import Error from "../components/Error";

export default function ListUser(props) {
    const [listUser, setUser] = useState([]);
    const [role, setRole] = useState("client");
    const [views, setViews] = useState("");
    const [error, setError] = useState("");
    const [deleteQuestion, setDeleteQuestion] = useState("close")
    const [oneUser, setOneUser] = useState({
        personalData: [],
        address: []
    });

    const userList = () => {
        axios.post("http://127.0.0.1:8080/user/all")
            .then((res) => {
                setUser(res.data)
            })
    };

    const userOne = (_id) => {
        axios.get("http://127.0.0.1:8080/user/" + _id)
            .then((res) => {
                setOneUser(res.data)
            })
    };

    const delateUser = (_id) => {
        axios.delete(`http://127.0.0.1:8080/user/delate/` + _id)
            .then(() => {
                setError(<Error isAlternative={true}>Konto zostało usunięte </Error>)
                userList()
            })
    }

    const tableName = () => {
        if (role === "employee") {
            return "Lista Pracowników"
        } else if (role === "client") {
            return "Lista Klijetów"
        } else {
            return "Administratorzy strony"
        }
    };
    useEffect(() => {
        userList()
    }, [])

    if (views === "oneUser") {
        if (role === "client") {
            return (
                <div className={styles.content}>
                    <MainSecondHeder>{oneUser.personalData.firstName}</MainSecondHeder>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="2">
                                    Dane Personalne
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Imię
                                </td>
                                <td>{oneUser.personalData.firstName}</td>
                            </tr>
                            <tr>
                                <td>Nazwisko</td>
                                <td>{oneUser.personalData.lastName}</td>
                            </tr>
                            <tr>
                                <td>PESEL</td>
                                <td>{oneUser.personalData.numberId}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className={styles.thead}>
                                    Dane Kontaktowe
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{oneUser.email}</td>
                            </tr>
                            <tr>
                                <td>Numer telefonu</td>
                                <td>{oneUser.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className={styles.thead}>Adres</td>
                            </tr>
                            <tr>
                                <td>Miasto</td>
                                <td>{oneUser.address.city}</td>
                            </tr>
                            <tr>
                                <td>Ulica</td>
                                <td>{oneUser.address.street}</td>
                            </tr>
                            <tr>
                                <td>Numer Domu</td>
                                <td>{oneUser.address.number}</td>
                            </tr>
                            <tr>
                                <td>Kod Pocztowy</td>
                                <td>{oneUser.address.zipCode}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button
                        onClick={() => setViews("")}>Wróć</Button>
                </div>
            )
        } else {
            return (
                <div className={styles.content}>
                    <MainSecondHeder>{oneUser.personalData.firstName}</MainSecondHeder>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="2">
                                    Dane Personalne
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Imię
                                </td>
                                <td>{oneUser.personalData.firstName}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className={styles.thead}>
                                    Dane Kontaktowe
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{oneUser.email}</td>
                            </tr>
                            <tr>
                                <td>Numer telefonu</td>
                                <td>{oneUser.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button onClick={() => setViews("")}>Wróć</Button>
                </div>
            )

        }

    }
    return (
        <div className={styles.content}>
            <MainSecondHeder>Lista Użytkowników</MainSecondHeder>

            {props.userData.user.role === "admin" && (
                <div className={styles.contentBtn}>
                    <Button onClick={() => setRole('admin')}>Administratorzy</Button>
                    <Button onClick={() => setRole('employee')}>Pracownicy</Button>
                    <Button onClick={() => setRole('client')}>Klięci</Button>
                </div>
            )}
            {error}
            <table>
                <thead>
                    <tr>
                        <td colSpan="4"><p>{tableName()}</p> </td>
                    </tr>
                    <tr>
                        <td>Imię</td>
                        <td>Numer Kontaktowy</td>
                        <td>Emial</td>
                        <td>Akcje</td>
                    </tr>
                </thead>
                <tbody>
                    {listUser.map((user) => {
                        if (user.role === role) {
                            return (
                                <tr key={user._id}>
                                    <td>
                                        {user.personalData.firstName}
                                    </td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>

                                    {deleteQuestion === "open" && (
                                        <td>
                                            <p>Jesteś Pewien?</p>
                                            <Button onClick={() => delateUser(user._id)}>tak</Button>
                                            <Button
                                                onClick={() => setDeleteQuestion("close")}>Nie</Button>
                                        </td>
                                    )}
                                    {deleteQuestion === "close" && (
                                        <td>
                                            <Button onClick={() => {
                                                userOne(user._id)
                                                setViews("oneUser")
                                            }}>Wiecej informacji</Button>
                                            {props.userData.user.role === "admin" && (
                                                <Button onClick={() => setDeleteQuestion("open")}>Usuń</Button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div>
    )
}