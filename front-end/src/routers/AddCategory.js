import React, { useState } from "react";
import axios from "axios";
/* components */
import Error from "../components/Error";
import MyInput from "../components/MyInput";
import Button from "../components/Button";
export default function AddCategory(props) {
    const [newCategory, setNewCategory] = useState("");
    const [error, setError] = useState("");

    const addCategory = () => {
        if (!newCategory) {
            setError(<Error>To pole nie może być puste</Error>)
        } else {
            axios.post("http://127.0.0.1:8080/category/add", { category: newCategory })
                .then(() => {
                    props.listCategory()
                })
            setNewCategory("")
        }
    }
    return (
        <form>
            {error}
            <MyInput
                placeholder="Nazwa Kategorii"
                value={newCategory}
                onChange={(e) => { setNewCategory(e.target.value) }}
                type="text" />
            <div>
                <Button onClick={(e) => {
                    e.preventDefault();
                    addCategory()
                    props.setAddCategory(false)
                }}>Dodaj</Button>
                <Button onClick={() => props.setAddCategory(false)}>Anuluj</Button>
            </div>

        </form>
    )
}