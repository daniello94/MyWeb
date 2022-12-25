import { useState } from "react";
import axios from "axios";
/* components */
import Container from "../components/Container";
import MyHeder from "../components/MainHeder";
import MyInput from "../components/MyInput";
import Button from "../components/Button";
import Error from "../components/Error";
/* style */
import "../views/SendEmailResetPassword.module.scss";

export default function SendEmailResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [errorInput, setErrorInput] = useState(false)

    const setEmailGenerateToken = () => {
        if (!email) {
            setError(<Error>To pole nie może być puste</Error>)
            setErrorInput(true)
        } else if (errorInput === false) {
            axios.post("http://127.0.0.1:8080/user/generate-token", {
                email: email
            })
                .then((res) => {
                    if (res.status === 200) {
                        setError(<Error isAlternative={true}>Link resetujący hasło został wysłąny na podany adres email</Error>)
                        setEmail("")
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setError(<Error>Nie znaleziono adresu emial</Error>)
                    } else if (error.response.status === 500) {
                        setError(<Error>Wystąpił bład podczas wysyłania żadania resetu hasła</Error>)
                    }
                })
        }
    }
    return (
        <Container forContainer={true}>
            <MyHeder>Reset Hasła</MyHeder>
            <p>Wpisz adres email z którym masz powiązane konto</p>

            {error}
            <form>
                <MyInput
                    isError={errorInput}
                    type="text"
                    placeholder="emial"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value))) {
                            setErrorInput(true)
                            setError(<Error>Podałeś nie wąsciwą skłądnie email</Error>)
                        } else if (e.target.value === 0) {
                            setErrorInput(true)
                            setError(<Error>To pole nie może być puste</Error>)
                        } else {
                            setErrorInput(false)
                        }
                    }} />
                <Button type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setEmailGenerateToken()
                    }}>Wyśłij</Button>
            </form>
        </Container>

    )
}