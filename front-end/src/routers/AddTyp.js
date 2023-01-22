import React, { useState } from "react";
import axios from "axios";
/* components */
import Error from "../components/Error";
import MyInput from "../components/MyInput";
import Button from "../components/Button";
export default function AddTyp(props) {
    const [newTyp, setNewTyp] = useState("");
    const [error, setError] = useState("")

    const addTyp = () => {
        if (!newTyp) {
            setError(<Error>To pole nie może być puste</Error>)
        } else {
            axios.post("http://127.0.0.1:8080/typ/add", { typ: newTyp })
                .then(() => {
                    props.listTyp()
                })

            setNewTyp("")
        }
    }
    return (
        <form>
            {error}
            <MyInput
                placeholder="Podaj Typ"
                value={newTyp}
                onChange={(e) => { setNewTyp(e.target.value) }}
                type="text" />
            <div>
                <Button onClick={(e) => {
                    e.preventDefault();
                    addTyp()
                    props.setAddNewTyp(false)
                }}>Dodaj</Button>
                <Button onClick={() => props.setAddNewTyp(false)}>Anuluj</Button>
            </div>

        </form>
    )
}