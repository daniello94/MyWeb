import React, { useState,useEffect } from "react";
import axios from "axios";
/* components */
import Container from "../components/Container";
import MainHeder from "../components/MainHeder";
import MyInput from "../components/MyInput";
import Button from "../components/Button";
import Error from "../components/Error";
import MyLink from "../components/MyLink";

export default function DelateUser(props) {
    const [email, setEmail] = useState("");
    const [errorInput, setErrorInput] = useState(false);
    const [error, setError] = useState("");
    const [stanUser, setStanUser] = useState(false)
    const id = props.userData.user._id;
    const userEmail = props.userData.user.email;
    const { onIsOnPageChange } = props;
    useEffect(() => {
        const currentUrl = window.location.pathname;
        if (currentUrl === '/delate') {
          onIsOnPageChange(true);
        } else {
          onIsOnPageChange(false);
        }
      }, [onIsOnPageChange]);

    const delateUser = () => {
        if (!email) {
            setError(<Error>To pole nie może być puste</Error>)
            setErrorInput(true)
        } else if (email !== userEmail) {
            setError(<Error>Podany email nie jest powiązany z twoim kontem</Error>)
            setErrorInput(true)
        } else {
            axios.delete(`http://127.0.0.1:8080/user/delate/` + id)
                .then(() => {
                    setError(<Error isAlternative={true}>Konto zostało usunięte </Error>)
                    localStorage.clear();
                    setStanUser(true)
                })
        }
    }
    const logOut = () => {
        localStorage.clear();
        setInterval();
    };
    if (stanUser === true) {
        return (
            <Container fiveContainer={true}>
                {error}
                <MyLink treeLink={true} to="/" onClick={logOut}>Wyloguj się</MyLink>
            </Container>
        )
    }
    return (
        <Container ninthContainer={true}>
            <MainHeder>Usunięcie Konta</MainHeder>
            {error}
            <form>
                <label >
                    <p>Wpisz emial powiązany z twoim kontem</p>
                    <MyInput
                        isError={errorInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </label>
                <Button onClick={(e) => {
                    e.preventDefault()
                    delateUser()
                }}>Usuń konto</Button>
            </form>
        </Container>
    )
}