import React, { useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
/* components */
import Container from "../components/Container";
import MainHeder from "../components/MainHeder";
import Button from "../components/Button";
import Error from "../components/Error";
import MyInput from "../components/MyInput";
import MyLink from "../components/MyLink";
/* style */
import "../views/LoginAndSignUp.module.scss";

export default function LoginAndSignUp(props) {
    const [registration, setRegistration] = useState("");
    const [isMyInputError, setMyInputError] = useState(false);
    const [isMyInputErrorLastName, setMyInputErrorLastName] = useState(false);
    const [isMyInputErrorNumberId, setMyInputErrorNumberId] = useState(false);
    const [isMyInputErrorPhoneNumber, setMyInputErrorPhoneNumber] = useState(false);
    const [isMyInputErrorCity, setMyInputErrorCity] = useState(false);
    const [isMyInputErrorStreet, setMyInputErrorStreet] = useState(false);
    const [isMyInputErrorNumber, setMyInputErrorNumber] = useState(false);
    const [isMyInputErrorZipCode, setMyInputErrorZipCode] = useState(false);
    const [isMyInputErrorEmail, setMyInputErrorEmail] = useState(false);
    const [isMyInputErrorPassword, setMyInputErrorPassword] = useState(false)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [numberId, setNumberId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [error, setError] = useState("");
    const [errorStatus, setErrorStatus] = useState("");

    const registrationUser = () => {
        let info = "Popraw błedy aby się zarejestrować"
        if (isMyInputError === true || !firstName) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputError(true)
        } else if (isMyInputErrorLastName === true || !lastName) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorLastName(true);
        } else if (isMyInputErrorNumberId === true || !numberId) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorNumberId(true);
        } else if (isMyInputErrorPhoneNumber === true || !phoneNumber) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorPhoneNumber(true);
        } else if (isMyInputErrorCity === true || !city) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorCity(true);
        } else if (isMyInputErrorStreet === true || !street) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorStreet(true);
        } else if (isMyInputErrorNumber === true || !number) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorNumber(true);
        } else if (isMyInputErrorZipCode === true || !zipCode) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorZipCode(true);
        } else if (isMyInputErrorEmail === true || !email) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorEmail(true);
        } else if (isMyInputErrorPassword === true || !password) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorPassword(true);
        } else if (!repPassword) {
            setErrorStatus(<Error>{info}</Error>);
            setMyInputErrorPassword(true);
        } else if (repPassword !== password) {
            setErrorStatus(<Error>{info}</Error>);
            setError(<Error>Wpisane hasła nie są identyczne</Error>)
            setMyInputErrorPassword(true);
        } else {
            axios.post("http://127.0.0.1:8080/user/check-email-uniqueness", { email })
                .then((res) => {
                    if (res.data.exists) {
                        setError(<Error>Adres email jest zajęty</Error>)
                        setMyInputErrorEmail(true)
                    } else {
                        const formData = {
                            personalData: {
                                firstName: firstName,
                                lastName: lastName,
                                numberId: numberId
                            },
                            address: {
                                city: city,
                                street: street,
                                number: number,
                                zipCode: zipCode
                            },
                            phoneNumber: phoneNumber,
                            email: email,
                            password: password

                        }
                        axios.post('http://127.0.0.1:8080/user/signup', formData)
                            .then(() => {
                                setError(<Error isAlternative={true}>Zostałeś zarejestrowany możesz sie teraz zalogować</Error>)
                            })
                        setFirstName("");
                        setLastName("")
                        setNumberId("");
                        setCity("");
                        setStreet("");
                        setNumber("");
                        setZipCode("");
                        setPhoneNumber("");
                        setEmail("");
                        setPassword("");
                        setRepPassword("");
                        setRegistration("");
                        setMyInputError(false);
                    }
                })
                .catch(() => {
                    setError(<Error>Wystąpił bład podczas sprawdzania unikalnosci adresu email</Error>)
                })
        }
    };
    const loginUser = () => {
        if (!email) {
            setError(<Error>Wprowadaź adres emai</Error>);
        } else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))) {
            setError(<Error>Wprowadaź porpawny email</Error>);
        } else if (!password) {
            setError(<Error>Wprowadź hasło</Error>);
        } else {
            axios.post("http://127.0.0.1:8080/user/login", {
                email: email,
                password: password
            })
                .then((req) => {
                    if (!req.data.success) {
                        setError(<Error>Podane dane logowania są nieprawidłowe</Error>);
                    } else {
                        props.setUser(req.data);
                        localStorage.setItem("user", JSON.stringify(req.data));
                    }
                })
        }

    };

    if (registration === "openRegistration") {
        return (
            <Container secundContainer={true}>
                {errorStatus}
                <MainHeder>Rejestracja</MainHeder>
                {error}
                <form>
                    <label>
                        <span>Dane personalne</span>
                        <div>
                            <MyInput
                                isError={isMyInputError}
                                type="text"
                                value={firstName}
                                onChange={e => {
                                    setFirstName(e.target.value);
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz swoje imię</Error>);
                                        setMyInputError(true);
                                    } else {
                                        setError("");
                                        setErrorStatus("");
                                        setMyInputError(false);
                                    }
                                }}
                                placeholder="Wpisz swoje imię" />
                            <MyInput
                                isError={isMyInputErrorLastName}
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz swoje nazwisko</Error>);
                                        setMyInputErrorLastName(true);
                                    } else {
                                        setError("");
                                        setErrorStatus("");
                                        setMyInputErrorLastName(false);
                                    }
                                }}
                                placeholder="Wpisz swoje nazwisko" />
                            <MyInput
                                isError={isMyInputErrorNumberId}
                                type="text"
                                value={numberId}
                                onChange={(e) => {
                                    setNumberId(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz Pesel</Error>);
                                        setMyInputErrorNumberId(true);
                                    } else if (e.target.value.length <= 10) {
                                        setError(<Error>Podany numer jest zbyt krótki</Error>);
                                        setMyInputErrorNumberId(true)
                                        return
                                    } else if (e.target.value.length >= 12) {
                                        setError(<Error>Podany numer jest za długi</Error>);
                                        setMyInputErrorNumberId(true)
                                        return
                                    } else if (/\D/.test(e.target.value)) {
                                        setError(<Error>Podałeś błedny znak numer PESEL skłąda się z samych cyfr</Error>);
                                        setMyInputErrorNumberId(true)
                                        return
                                    } else {
                                        setError("");
                                        setErrorStatus("");
                                        setMyInputErrorNumberId(false);
                                    }
                                }}
                                placeholder="Pesel" />
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
                                        setErrorStatus("");
                                        setMyInputErrorPhoneNumber(false);
                                    }
                                }}
                                placeholder="Numer kontaktowy" />
                        </div>
                    </label>
                    <label>
                        <span>Adres</span>
                        <div>
                            <MyInput
                                isError={isMyInputErrorCity}
                                type="text"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz miasto</Error>);
                                        setMyInputErrorCity(true)
                                    } else {
                                        setError("");
                                        setMyInputErrorCity(false);
                                        setErrorStatus("");
                                    }
                                }}
                                placeholder="miasto" />
                            <MyInput
                                isError={isMyInputErrorStreet}
                                type="text"
                                value={street}
                                onChange={(e) => {
                                    setStreet(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz ulice</Error>)
                                        setMyInputErrorStreet(true)
                                    } else {
                                        setError("");
                                        setMyInputErrorStreet(false);
                                        setErrorStatus("");
                                    }
                                }}
                                placeholder="ulica" />
                            <MyInput
                                isError={isMyInputErrorNumber}
                                type="text"
                                value={number}
                                onChange={(e) => {
                                    setNumber(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz numer domu</Error>);
                                        setMyInputErrorNumber(true)
                                    } else {
                                        setError("");
                                        setMyInputErrorNumber(false);
                                        setErrorStatus("");
                                    }
                                }}
                                placeholder="numer domu" />
                            <MyInput
                                isError={isMyInputErrorZipCode}
                                type="text"
                                value={zipCode}
                                onChange={(e) => {
                                    setZipCode(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz kod podcztowy</Error>);
                                        setMyInputErrorZipCode(true);
                                    } else {
                                        setError("")
                                        setMyInputErrorZipCode(false);
                                        setErrorStatus("");
                                    }
                                }}
                                placeholder="kod pocztowy" />
                        </div>
                    </label>

                    <label>
                        <span>Dane konta</span>
                        <div>
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
                                        setErrorStatus("");
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
                                        setError("Wpisz hasło");
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
                                        setErrorStatus("");
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
                                        setErrorStatus("");
                                    }
                                }}
                                value={repPassword}
                                placeholder="powtórz hasło" />
                        </div>

                    </label>
                    <div>
                        <Button type="submit" onClick={(e) => {
                            e.preventDefault();
                            registrationUser()
                        }}>Zarejestruj</Button>
                        <Button onClick={() => {
                            setRegistration("");
                            setError("");
                            setErrorStatus("");
                            setPassword("");
                            setEmail("");
                            setRepPassword("");
                            setMyInputErrorEmail(false)
                        }}>Powrót do logowania</Button>
                    </div>

                </form>
            </Container>
        )
    }
    return (
        <Container secundContainer={true}>
            <MainHeder>Logowanie</MainHeder>
            {props.userData && <Navigate to='/' />}
            {error}
            <form>
                <MyInput
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Login" />
                <MyInput
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Hasło" />
                <Button type="submit" onClick={(e) => {
                    e.preventDefault();
                    loginUser()
                }}>Zaloguj</Button>
            </form>
            <p>Nie pamietasz hasła klijknij <MyLink onClick={props.userOption} to="/reset-password-email">tutaj</MyLink></p>
            <p>Aby stworzyć konto kliknij <Button secundBtn={true} onClick={() => {
                setRegistration("openRegistration");
                setError("")
            }}>tutaj</Button></p>
        </Container>
    )
}