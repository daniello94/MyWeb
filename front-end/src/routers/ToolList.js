import React, { useState, useEffect } from "react";
import axios from "axios";
/* components and style */
import styles from "../views/ToolList.module.scss";
import Container from "../components/Container";
import MainHeder from "../components/MainHeder";
import Button from "../components/Button";

export default function ToolList() {
    const [listEquipment, setListEquipment] = useState([]);
    const [viewsCategory, setViewsCategory] = useState([])
    const [viewsTyp, setViewsTyp] = useState([])
    const [clickCategory, setClickCategory] = useState("")
    const [clickMachine, setClickMachine] = useState("")
    const [views, setViews] = useState("all")
    const displayedTypes = [];
   
    const equipmentList = () => {
        axios.post("http://127.0.0.1:8080/equipment/all")
            .then((res) => {
                setListEquipment(res.data)
            })
    };
    const listCategory = () => {
        axios.post("http://127.0.0.1:8080/category/all")
            .then((res) => {
                setViewsCategory(res.data)
            })
    }
    const listTyp = () => {
        axios.post("http://127.0.0.1:8080/typ/all")
            .then((res) => {
                setViewsTyp(res.data)
            })
    }
    useEffect(() => {
        equipmentList()
        listCategory()
        listTyp()
    }, [])
    return (
        <Container sevenContainer={true}>
            <MainHeder secundHeder={true}>Nasza Oferta</MainHeder>
            <Container sixContainer={true}>
                <div className={styles.listMachine}>
                    <select className={styles.selectMachine} onChange={(e) => setViews(e.target.value)}>
                        {viewsCategory.map((optionCategory) => {
                            return (
                                <option key={optionCategory._id} value={optionCategory.category}>{optionCategory.category}</option>
                            )
                        })}
                    </select>
                    {listEquipment.map((nameMachine) => {
                        if (displayedTypes.includes(nameMachine.typ) || !(nameMachine.category === views || views === "all")) {
                            return null;
                        }
                        displayedTypes.push(nameMachine.typ);
                        return (
                            <Button onClick={() => {
                                setClickCategory(nameMachine.category)
                                setClickMachine(nameMachine.typ)
                            }} key={nameMachine._id} thirdBtn={true}>{nameMachine.typ}</Button>
                        )
                    })}

                </div>
                <div className={styles.clickMachine}>
                    {listEquipment.map((viewsMachine) => {
                        if (viewsMachine.typ === clickMachine && viewsMachine.category === clickCategory) {
                            return (
                                <p key={viewsMachine._id}>{viewsMachine.machineName} {viewsMachine.category}</p>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </Container>
        </Container>
    )
}