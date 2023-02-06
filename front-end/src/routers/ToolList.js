import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoEquipment from "./InfoEquipment";
/* components and style */
import styles from "../views/ToolList.module.scss";
import Container from "../components/Container";
import MainHeder from "../components/MainHeder";
import Button from "../components/Button";
import HederLine from "../components/HederLine";

export default function ToolList(props) {
    const { onIsOnPageChange } = props;
    const [listEquipment, setListEquipment] = useState([]);
    const [viewsCategory, setViewsCategory] = useState([]);
    const [clickCategory, setClickCategory] = useState("");
    const [clickMachine, setClickMachine] = useState("");
    const [views, setViews] = useState("all");
    const [openInfoEqu, setOpenInfoEqu] = useState(false);
    const [idEqu, setIdEqu] = useState("")
    const displayedTypes = [];

    const openViewsMachine = () => {
        if (openInfoEqu === true) {
            setOpenInfoEqu(false)
        } else if (openInfoEqu === false) {
            setOpenInfoEqu(true)
        }
    }
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
    useEffect(() => {
        equipmentList()
        listCategory()
        const currentUrl = window.location.pathname;
        if (currentUrl === '/tooList') {
            onIsOnPageChange(false);
        } else {
            onIsOnPageChange(true);
        }
    }, [onIsOnPageChange])
    return (
        <Container sevenContainer={true}>
            <MainHeder secundHeder={true}>Nasza Oferta</MainHeder>
            <Container sixContainer={true}>
                <div className={styles.listMachine}>
                    <select className={styles.selectMachine} onChange={(e) => setViews(e.target.value)}>
                        <option value={"all"}>Wszystkie</option>
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
                            let writing = "urządzeń";
                            if (viewsMachine.quantity === "1") {
                                writing = "urządzenie";
                            } else if (viewsMachine.quantity > "1" && viewsMachine.quantity < "5") {
                                writing = "urządzenia";
                            }
                            return (
                                <div key={viewsMachine._id} className={styles.contentOffer}>
                                    <div className={styles.viewsOffer}>
                                        <div className={styles.photoMachine}>
                                            <img src={'http://localhost:8080/photo/' + viewsMachine.mainPicture} alt="foto profil" />
                                        </div>
                                        <div className={styles.infoOffer}>
                                            <p><span>{viewsMachine.machineName} {viewsMachine.model}</span></p>
                                            <p>Obecnie mamy na stanie {viewsMachine.quantity} {writing}</p>
                                            <p><span>{viewsMachine.unitPriceService} PLN </span> za dobę</p>
                                        </div>
                                        <div className={styles.contentBtn}>
                                            <Button onClick={() => {
                                                openViewsMachine()
                                                setIdEqu(viewsMachine._id)
                                            }}>Wiecej Informacji</Button>
                                            <Button> Wynajjmij teraz</Button>
                                        </div>
                                    </div>
                                    <HederLine secundLine={true} />
                                </div>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </Container>
            {openInfoEqu === true && (
                <InfoEquipment
                    id={idEqu}
                    openInfoEqu={() => openViewsMachine()} />
            )}
        </Container>
    )
}