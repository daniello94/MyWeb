import React, { useState } from "react";
import axios from "axios";
/* components and style*/
import Error from "../components/Error";
import MyInput from "../components/MyInput";
import MainSecondHeder from "../components/MainSecoundHeder";
import Button from "../components/Button";
import styles from "../views/AddEmployee.module.scss";

export default function AddEmployee() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [repPassword, setRepPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [isMyInputErrorPhoneNumber, setMyInputErrorPhoneNumber] = useState(false);
    const [isMyInputErrorEmail, setMyInputErrorEmail] = useState(false);
    const [isMyInputErrorPassword, setMyInputErrorPassword] = useState(false)
    const [isMyInputError, setMyInputError] = useState(false);

    const registrationEmployee = () => {
        let info = <Error>Popraw błedy aby dodać pracownika</Error>
        if (!firstName) {
            setMyInputError(true);
            setError(info);
        } else if (!phoneNumber) {
            setMyInputErrorPhoneNumber(true)
            setError(info)
        } else if (!email) {
            setError(info)
            setMyInputErrorEmail(true)
        } else if (!password) {
            setMyInputErrorPassword(true)
            setError(info)
        } else if (password !== repPassword || isMyInputErrorPassword === true) {
            setMyInputErrorPassword(true)
            setError(info)
            setPassword("")
            setRepPassword("")
        } else {
            axios.post("http://127.0.0.1:8080/user/check-email-uniqueness", { email })
                .then((res) => {
                    if (res.data.exists) {
                        setError(<Error>Adres email jest zajęty</Error>)
                        setMyInputErrorEmail(true)
                    } else {
                        const formData = {
                            personalData: {
                                firstName: firstName
                            },
                            phoneNumber: phoneNumber,
                            email: email,
                            password: password,
                            role: "employee"
                        }
                        axios.post('http://127.0.0.1:8080/user/signup', formData)
                            .then(() => {
                                setError(<Error isAlternative={true}>Dodałeś pracownika</Error>)
                            })
                    }
                })
                .catch(() => {
                    setError(<Error>Wystąpił bład podczas sprawdzania unikalnosci adresu email</Error>)
                })
            setFirstName("")
            setEmail("")
            setPassword("")
            setRepPassword("")
        }
    }
    return (
        <div className={styles.content}>
            <MainSecondHeder>Dodaj pracownika</MainSecondHeder>
            <form>
                {error}
                <p>Dane Personalne</p>
                <label>
                    <MyInput isError={isMyInputError}
                        type="text"
                        value={firstName}
                        placeholder="Wpisz Imię"
                        onChange={(e) => {
                            setFirstName(e.target.value)
                            if (e.target.value === 0) {
                                setError(<Error>Podaj imię</Error>)
                                setMyInputError(true)
                            } else {
                                setError("")
                                setMyInputError(false)
                            }
                        }} />
                    <MyInput
                        isError={isMyInputErrorPhoneNumber}
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                            if (e.target.value.length === 0) {
                                setError(<Error>Wpisz numer telefonu</Error>);
                                setMyInputErrorPhoneNumber(true)
                                return
                            } else if (/\D/.test(e.target.value)) {
                                setError(<Error>Podałeś błedny znak, wprowadź same cyfry</Error>)
                                setMyInputErrorPhoneNumber(true)
                                return
                            } else {
                                setError("");

                                setMyInputErrorPhoneNumber(false);
                            }
                        }}
                        placeholder="Numer kontaktowy" />
                </label>
                <p>Dane Konta</p>
                <label>

                    <MyInput
                        isError={isMyInputErrorEmail}
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value)
                            if (e.target.value.length === 0) {
                                setError(<Error>Podaj adres email</Error>)
                                setMyInputErrorEmail(true)
                            } else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value))) {
                                setError(<Error>Wprowadaź porpawny email</Error>);
                                setMyInputErrorEmail(true)
                                return
                            } else {
                                setError("");
                                setMyInputErrorEmail(false);
                            }
                        }}
                        value={email}
                        placeholder="emial" />
                    <MyInput
                        isError={isMyInputErrorPassword}
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (e.target.value.length === 0) {
                                setError(<Error>Wpisz hasło</Error>);
                                setMyInputErrorPassword(true)
                            } else if (e.target.value.length < 6) {
                                setError(<Error>Hasło musi zawierać minimum 6 znaków</Error>)
                            } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(e.target.value)) {
                                setError(<Error>Hasło musi zawierać znak specjalny np: @ ! # & % $</Error>)
                            } else if (!/^[^\s]*$/.test(e.target.value)) {
                                setError(<Error>Hasło nie może zawierać pustych znaków</Error>)
                            } else {
                                setError("");
                                setMyInputErrorPassword(false);
                            }
                        }}
                        value={password}
                        placeholder="hasło" />
                    <MyInput
                        isError={isMyInputErrorPassword}
                        type="password"
                        onChange={(e) => {
                            setRepPassword(e.target.value)
                            if (e.target.value.length === 0) {
                                setError(<Error>Wpisz ponowine hasło</Error>)
                                setMyInputErrorPassword(true)
                            } else if (password !== e.target.value) {
                                setError(<Error>Wpisane hasła nie są identyczne</Error>)
                                setMyInputErrorPassword(true)
                            } else {
                                setError("");
                                setMyInputErrorPassword(false);
                            }
                        }}
                        value={repPassword}
                        placeholder="powtórz hasło" />
                </label>
                <Button type='submit' onClick={(e) => {
                    e.preventDefault();
                    registrationEmployee()
                }}>Dodaj Pracownika</Button>

            </form>
        </div>
    )
}