import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
/* style and components */
import styles from "../views/AddOrders.module.scss";
import Container from "../components/Container";
import MainHeder from "../components/MainHeder";
import Button from "../components/Button";
import Error from "../components/Error";
import MyInput from "../components/MyInput";

export default function AddOrders(props) {
    let { id } = useParams()
    const { onIsOnPageChange } = props;
    const [orders, setOrders] = useState("");
    const [error, setError] = useState("")
    const [optionForm, setOptionForm] = useState(props.userData?.user.typePerson)
    const [firstName, setFirstName] = useState(props.userData?.user.personalData.firstName)
    const [lastName, setLastName] = useState(props.userData?.user.personalData.lastName)
    const [numberId, setNumberId] = useState(props.userData?.user.personalData.numberId)
    const [numberIdCompany, setNumberIdCompany] = useState(props.userData?.user.dataCompany.numberIdCompany)
    const [nameCompany, setNameCompany] = useState(props.userData?.user.dataCompany.nameCompany)
    const [phoneNumber, setPhoneNumber] = useState(props.userData?.user.phoneNumber)
    const [city, setCity] = useState(props.userData?.user.address.city)
    const [street, setStreet] = useState(props.userData?.user.address.street)
    const [number, setNumber] = useState(props.userData?.user.address.number)
    const [zipCode, setZipCode] = useState(props.userData?.user.address.zipCode)
    const [email, setEmail] = useState(props.userData?.user.email)
    const [errorFirstName, setErrorFirstName] = useState(false)
    const [errorLastName, setErrorLastName] = useState(false)
    const [errorNumberId, setErrorNumberId] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorStreet, setErrorStreet] = useState(false)
    const [errorIdCompany, setErrorIdCompany] = useState(false)
    const [errorNameCompany, setErrorNameCompany] = useState(false)
    const [errorNumber, setErrorNumber] = useState(false);
    const [errorZipCode, setErrorZipCode] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false)

    const viewsMachine = (id) => {
        axios.get("http://127.0.0.1:8080/equipment/" + id)
            .then((res) => {
                setOrders(res.data)
            })
    }

    const addOrder = (_id) => {
        if (
            (optionForm === "Osoba Prywatna" &&
                errorPhoneNumber === false && phoneNumber &&
                errorCity === false && city &&
                errorStreet === false && street &&
                errorNumber === false && number &&
                errorZipCode === false && zipCode &&
                errorFirstName === false && firstName &&
                errorEmail === false && email &&
                errorLastName === false && lastName &&
                errorNumberId === false && numberId) ||
            (optionForm === "Firma" &&
                errorPhoneNumber === false && phoneNumber &&
                errorEmail === false && email &&
                errorCity === false && city &&
                errorStreet === false && street &&
                errorNumber === false && number &&
                errorZipCode === false && zipCode &&
                errorIdCompany === false && numberIdCompany &&
                errorNameCompany === false && nameCompany)
        ) {
            axios.put("http://127.0.0.1:8080/equipment/application/" + _id, {
                dataPerson: {
                    firstName: firstName,
                    lastName: lastName,
                    numberId: numberId,
                },
                dataCompany: {
                    nameCompany: nameCompany,
                    numberIdCompany: numberIdCompany
                },
                phoneNumber: phoneNumber,
                typePerson: optionForm,
                address: {
                    city: city,
                    street: street,
                    number: number,
                    zipCode: zipCode,
                    email: email
                }
            })
                .then(() => {
                    setError(<Error isAlternative={true}>Zapytanie zostało wysłane pomyślnie</Error>)
                    setFirstName("")
                    setLastName("")
                    setNumberId("")
                    setPhoneNumber("")
                    setCity("")
                    setStreet("")
                    setNameCompany("")
                    setNumberIdCompany("")
                    setEmail("")
                })
        } else {
            setError(<Error>Formularz zawiera błedy popraw je</Error>)
        }
    }
    useEffect(() => {
        viewsMachine(id)
        if (!props.userData) {
            setOptionForm("Osoba Prywatna")
        }
        const currentUrl = window.location.pathname;
        if (currentUrl === `/tooList/${id}`) {
            onIsOnPageChange(false);
        } else {
            onIsOnPageChange(true);
        }
    }, [onIsOnPageChange, id, props.userData])
    return (
        <Container sevenContainer={true}>
            <MainHeder secundHeder={true}>Zamówienie dla {orders.machineName} {orders.model}</MainHeder>
            <div className={styles.contentOrders}>
                {props.userData && (
                    <p className={styles.textInfo}>Sprawdź poprawność danych przed wysąłniem zapytania o wynajem</p>
                )}
                {error}
                <select onClick={((e) => setOptionForm(e.target.value))}>
                    <option>{optionForm}</option>
                    {optionForm === "Osoba Prywatna" && (
                        <option value="Firma">Firma</option>
                    )}
                    {optionForm === "Firma" && (
                        <option value="Osoba Prywatna">Osoba Prywatna</option>
                    )}
                </select>
                <form>
                    {optionForm === "Osoba Prywatna" && (
                        <label>
                            <span>Imię</span>
                            <MyInput
                                type="text"
                                placeholder="Wpisz imię"
                                value={firstName}
                                isError={errorFirstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Podaj imię zamawiającego</Error>)
                                        setErrorFirstName(true)
                                    } else {
                                        setError("")
                                        setErrorFirstName(false)
                                    }
                                }} />
                        </label>
                    )}
                    {optionForm === "Osoba Prywatna" && (
                        <label>
                            <span>Nazwisko</span>
                            <MyInput
                                type="text"
                                placeholder="Wpisz nazwisko"
                                value={lastName}
                                isError={errorLastName}
                                onChange={((e) => {
                                    setLastName(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Wpisz nazwisko zamawiającego</Error>)
                                        setErrorLastName(true)
                                    } else {
                                        setError("")
                                        setErrorLastName(false)
                                    }
                                })}
                            />
                        </label>
                    )}

                    {optionForm === "Osoba Prywatna" && (
                        <label>
                            <span>PESEL</span>
                            <MyInput
                                type="text"
                                placeholder="Wpisz PESEL"
                                value={numberId}
                                isError={errorNumberId}
                                onChange={((e) => {
                                    setNumberId(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Podaj numer PESEL zamawiającego</Error>)
                                        setErrorNumberId(true)
                                    } else if (e.target.value.length <= 10) {
                                        setError(<Error>Podany numer jest za krótki</Error>)
                                        setErrorNumberId(true)
                                    } else if (e.target.value.length >= 12) {
                                        setError(<Error>Podany numer jest za długi</Error>);
                                        setErrorNumberId(true)
                                        return
                                    } else if (/\D/.test(e.target.value)) {
                                        setError(<Error>Podałeś błedny znak numer PESEL skłąda się z samych cyfr</Error>);
                                        setErrorNumberId(true)
                                        return
                                    } else {
                                        setError("");
                                        setErrorNumberId(false);
                                    }
                                })} />
                        </label>
                    )}
                    {optionForm === "Firma" && (
                        <label>
                            <span>Nazwa Firmy</span>
                            <MyInput
                                type="text"
                                placeholder="Wpisz nazwe firmy"
                                value={nameCompany}
                                isError={errorNameCompany}
                                onChange={((e) => {
                                    setNameCompany(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Podaj nazwę firmy</Error>)
                                        setErrorNameCompany(true)
                                    } else {
                                        setError("");
                                        setErrorNameCompany(false);
                                    }
                                })} />
                        </label>
                    )}
                    {optionForm === "Firma" && (
                        <label>
                            <span>NIP</span>
                            <MyInput
                                type="text"
                                placeholder="Wpisz NIP"
                                value={numberIdCompany}
                                isError={errorIdCompany}
                                onChange={((e) => {
                                    setNumberIdCompany(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setError(<Error>Podaj numer NIP zamawiającego</Error>)
                                        setErrorIdCompany(true)
                                    } else if (e.target.value.length <= 9) {
                                        setError(<Error>Podany numer jest za krótki</Error>)
                                        setErrorIdCompany(true)
                                    } else if (e.target.value.length >= 11) {
                                        setError(<Error>Podany numer jest za długi</Error>);
                                        setErrorIdCompany(true)
                                        return
                                    } else if (/\D/.test(e.target.value)) {
                                        setError(<Error>Podałeś błedny znak numer NIP skłąda się z samych cyfr</Error>);
                                        setErrorIdCompany(true)
                                        return
                                    } else {
                                        setError("");
                                        setErrorIdCompany(false);
                                    }
                                })} />
                        </label>
                    )}


                    <label>
                        <span>Telefon</span>
                        <MyInput
                            type="text"
                            placeholder="Wpisz numer telefonu"
                            value={phoneNumber}
                            isError={errorPhoneNumber}
                            onChange={((e) => {
                                setPhoneNumber(e.target.value)
                                if (e.target.value.length === 0) {
                                    setError(<Error>Wpisz numer telefonu</Error>);
                                    setErrorPhoneNumber(true)
                                    return
                                } else if (/\D/.test(e.target.value)) {
                                    setError(<Error>Podałeś błedny znak, wprowadź same cyfry</Error>)
                                    setErrorPhoneNumber(true)
                                    return
                                } else {
                                    setError("");
                                    setErrorPhoneNumber(false);
                                }
                            })} />
                    </label>
                    <label>
                        <span>Email</span>
                        <MyInput
                            isError={errorEmail}
                            type="text"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (e.target.value.length === 0) {
                                    setError(<Error>Podaj adres email</Error>)
                                    setErrorEmail(true)
                                } else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value))) {
                                    setError(<Error>Wprowadaź porpawny email</Error>);
                                    setErrorEmail(true)
                                    return
                                } else {
                                    setError("");
                                    setErrorEmail(false);
                                }
                            }}
                            value={email}
                            placeholder="emial" />
                    </label>
                    <label>
                        <span>Miasto</span>
                        <MyInput
                            type="text"
                            placeholder="Wpisz Miasto"
                            value={city}
                            isError={errorCity}
                            onChange={((e) => {
                                setCity(e.target.value)
                                if (e.target.value.length === 0) {
                                    setError(<Error>Podaj misato zamieszkania</Error>)
                                    setErrorCity(true)
                                } else {
                                    setError("")
                                    setErrorCity(false)
                                }
                            })} />
                    </label>
                    <label>
                        <span>Ulica</span>
                        <MyInput
                            type="text"
                            placeholder="Wpisz nazwę ulicy"
                            value={street}
                            isError={errorStreet}
                            onChange={((e) => {
                                setStreet(e.target.value)
                                if (e.target.value.length === 0) {
                                    setError(<Error>Podaj misato zamieszkania</Error>)
                                    setErrorStreet(true)
                                } else {
                                    setError("")
                                    setErrorStreet(false)
                                }
                            })} />
                    </label>
                    <label>
                        <span>Numer</span>
                        <MyInput
                            type="text"
                            placeholder="Wpisz numer domu/mieszkania"
                            value={number}
                            isError={errorNumber}
                            onChange={((e) => {
                                setNumber(e.target.value)
                                if (e.target.value.length === 0) {
                                    setError(<Error>Podaj numer mieskznaia/domu</Error>)
                                    setErrorNumber(true)
                                } else {
                                    setError("")
                                    setErrorNumber(false)
                                }
                            })} />
                    </label>
                    <label>
                        <span>Kod Pocztowy</span>
                        <MyInput
                            type="text"
                            placeholder="Wpisz kod pocztowy"
                            value={zipCode}
                            isError={errorZipCode}
                            onChange={((e) => {
                                setZipCode(e.target.value)
                                if (e.target.value.length === 0) {
                                    setError(<Error>Podaj poprawny kod pocztowy</Error>)
                                    setErrorZipCode(true)
                                } else {
                                    setError("")
                                    setErrorZipCode(false)
                                }
                            })} />
                    </label>
                    <label>
                        <span>Okres Najmu</span>
                        <input placeholder="data rozpoczecia" />
                        <input placeholder="data zakonczenia" />
                    </label>
                    <Button type="submit" onClick={((e) => {
                        e.preventDefault();
                        addOrder(orders._id)
                    })}>Wyślij Zapytanie</Button>

                </form>
            </div>
        </Container>
    )
}