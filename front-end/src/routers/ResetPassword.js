import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
/* components */
import Container from '../components/Container';
import Error from '../components/Error';
import MyInput from '../components/MyInput';
import Button from '../components/Button';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [statusError, setStatusError] = useState(false)
    const { token } = useParams();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!password) {
            setError('Wpisz nowe hasło')
        } else if (password !== confirmPassword) {
            setError('Hasła nie są takie same');
            return;
        }
        try {
            const response = await axios.post(`http://127.0.0.1:8080/user/reset-password`, { token, password });
            setSuccess(response.data.success);
            setError(<Error isalternative={true}>Hasło zostało zmienione pomyśłnie możesz sie zalogować</Error>)
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <Container forContainer={true}>
            {error && <Error>{error}</Error>}
            {success && <Error isalternative={true}>{success}</Error>}
            <form onSubmit={handleResetPassword}>
                <label>
                    <p> Podaj nowe hasło:</p>
                    <MyInput
                        isError={statusError}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            if (confirmPassword !== password) {
                                setError("Podane hasła nie sa identyczne")
                                setStatusError(true)
                            } else if(confirmPassword === password) {
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
