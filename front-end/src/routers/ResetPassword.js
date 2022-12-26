import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
/* components */
import Container from '../components/Container';
import Error from '../components/Error';
import MyInput from '../components/MyInput';
import Button from '../components/Button';
import MainHeder from '../components/MainHeder';
import MyLink from '../components/MyLink';

export default function ResetPassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [statusError, setStatusError] = useState(false)
    const { token } = useParams();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!password) {
            setError(<Error>Wpisz nowe hasło</Error>)
        } else if (password !== confirmPassword) {
            setError(<Error>Hasła nie są identyczne</Error>);
        } else if (statusError === true) {
            setError(<Error>Wpisane hasło zawiera błedy popraw je </Error>)
        } else {
            axios.post('http://127.0.0.1:8080/user/reset-password', {
                token,
                password
            })
                .then((res) => {
                    if (res.status === 200) {
                        setError(<Error isAlternative={true}>Hasło zostało zresetowane możesz sie zalogować <MyLink secondLink={true} to="/signup" onClick={props.userOption}>klikając tutaj</MyLink> </Error>);
                        setPassword("");
                        setConfirmPassword("");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        setError(<Error>Twój link resetujący hasło stracił ważność</Error>)
                    } else if (error.response.status === 404) {
                        setError(<Error>Nie znaleziono użytkownika</Error>)
                    } else if (error.response.status === 500) {
                        setError(<Error>Wystąpił bład podczas uwierzytelniania użytkownika</Error>)
                    }
                })
        }
    };

    return (
        <Container forContainer={true}>
            <MainHeder>Hasło</MainHeder>
            {error}
            <form onSubmit={handleResetPassword}>
                <label>
                    <p> Podaj nowe hasło:</p>
                    <MyInput
                        isError={statusError}
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (e.target.value.length === 0) {
                                setError(<Error>Wpisz hasło</Error>);
                                setStatusError(true)
                            } else if (e.target.value.length < 6) {
                                setError(<Error>Hasło musi zawierać minimum 6 znaków</Error>)
                                setStatusError(true)
                            } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(e.target.value)) {
                                setError(<Error>Hasło musi zawierać znak specjalny np: @ ! # & % $</Error>)
                                setStatusError(true)
                            } else if (!/^[^\s]*$/.test(e.target.value)) {
                                setError(<Error>Hasło nie może zawierać pustych znaków</Error>)
                                setStatusError(true)
                            } else {
                                setError("");
                                setStatusError(false);
                            }
                        }}
                    />
                </label>
                <label>
                    <p> Potwierdź nowe hasło:</p>
                    <MyInput
                        isError={statusError}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            if (e.target.value !== password) {
                                setError(<Error>Podane hasła nie sa identyczne</Error>)
                                setStatusError(true)
                            } else if (e.target.value.length < 6) {
                                setError(<Error>Hasło musi zawierać minimum 6 znaków</Error>)
                                setStatusError(true)
                            } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(e.target.value)) {
                                setError(<Error>Hasło musi zawierać znak specjalny np: @ ! # & % $</Error>)
                                setStatusError(true)
                            } else if (!/^[^\s]*$/.test(e.target.value)) {
                                setError(<Error>Hasło nie może zawierać pustych znaków</Error>)
                                setStatusError(true)
                            } else {
                                setStatusError(false);
                                setError("")
                            }
                        }}
                    />
                </label>
                <Button type="submit">Zresetuj hasło</Button>
            </form>
        </Container>
    );
}
