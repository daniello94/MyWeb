import React, { useState, useEffect } from "react";
import axios from "axios";
/* component and style */
import Container from "../components/Container";
import Button from "../components/Button";
import MainSecondHeder from "../components/MainSecoundHeder";
import styles from "../views/InfoEquipment.module.scss"
export default function InfoEquipment(props) {
    const [machine, setMachine] = useState({
        gallery: [],
        mainPicture: ''
    });
    const [clickPhoto, setPhoto] = useState("");
    const id = props.id
    const viewsOneMachine = () => {
        axios.get("http://127.0.0.1:8080/equipment/" + id)
            .then((res) => {
                setMachine(res.data)
                setPhoto(res.data.mainPicture);
            })
    }
    useEffect(() => {
        viewsOneMachine()
    }, [id])
    return (
        <Container elevenContainer={true}>
            <div className={styles.hederContent}>
                <MainSecondHeder>{machine.machineName} {machine.model}</MainSecondHeder>
                <div className={styles.hederPicture}>
                    <img src={'http://localhost:8080/photo/' + clickPhoto} alt="foto gallery" />
                </div>
                <div>
                    {machine.gallery.map((photo) => {
                        return (
                            <img className={styles.clickPhoto} key={photo._id} onClick={() => setPhoto(photo.photo)} src={'http://localhost:8080/photo/' + photo.photo} alt="foto gallery" />
                        )
                    })}
                </div>
            </div>
            <div className={styles.infoProduct}>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={2}>Parametry i dostępność</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nazwa</td>
                            <td>{machine.machineName}</td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td>{machine.model}</td>
                        </tr>
                        <tr>
                            <td>Rok Produkcji</td>
                            <td>{machine.year}</td>
                        </tr>
                        <tr>
                            <td>Dostępność</td>
                            <td>{machine.quantity} szt.</td>
                        </tr>
                        <tr>
                            <td>Cena za dobę wypożyczenia</td>
                            <td>{machine.unitPriceService} PLN</td>
                        </tr>
                        
                        <tr>
                            <td className={styles.thead} colSpan={2}>Opis</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{machine.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.button}>
                 <Button>Wynajmij Teraz</Button>
                 <Button onClick={props.openInfoEqu}>Zamknij Podglad</Button>
            </div>
           
        </Container>
    )
}