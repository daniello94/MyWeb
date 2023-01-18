import React, { useState, useEffect } from "react";
import axios from "axios";
/* routers */
import Container from "../components/Container";
import Button from "../components/Button"
/* components and style*/
import MainHeder from "../components/MainHeder";
import MainSecondHeder from "../components/MainSecoundHeder";
import styles from "../views/Home.module.scss";
import videoHeder from "../media/heder.mp4";
export default function Home(props) {
  const [listEquipment, setListEquipment] = useState([]);
  const { onIsOnPageChange } = props;

  const equipmentList = () => {
    axios.post("http://127.0.0.1:8080/equipment/all")
      .then((res) => {
        setListEquipment(res.data)
      })
  };
  useEffect(() => {
    equipmentList()
    const currentUrl = window.location.pathname;
    if (currentUrl === '/') {
      onIsOnPageChange(false);
    } else {
      onIsOnPageChange(true);
    }
  }, [onIsOnPageChange]);
  return (
    <Container forContainer={true}>
      <video className={styles.videoHeder} src={videoHeder} autoPlay loop muted />
      <div className={styles.contentHome}>
        <MainHeder>Wypożyczalnia narzędzi</MainHeder>
        <p className={styles.sloganText}>"Zawsze gotowi do pracy, zawsze gotowi do wynajmu"</p>
        <div className={styles.textHeder}>
          <MainSecondHeder>Zapoznaj sie z naszą ofertą</MainSecondHeder>
          <p>Nie chcesz tracić pieniędzy na zakup drogich narzędzi, które rzadko używasz? Nasza wypożyczalnia oferuje szeroki wybór sprzętu budowlanego w atrakcyjnych cenach. Zadzwoń do nas lub zarezerwuj online już dziś i ciesz się profesjonalnym sprzętem bez konieczności jego zakupu!</p>
        </div>
      </div>
      <div className={styles.machineRecommend}>
        {listEquipment.map((list) => {
          if (list.recommend === true) {
            return (
              <div key={list._id} className={styles.oneMachineContent}>
                <div className={styles.mainPicture}>
                  <img src={'http://localhost:8080/photo/' + list.mainPicture} alt="foto profil" />
                </div>
                <div className={styles.contentTextMachine}>
                  <table>
                    <thead>
                      <tr>
                        <td>Nazwa</td>
                        <td>{list.machineName}</td>
                      </tr>
                      <tr>
                        <td>Cenna za dobę</td>
                        <td>{list.unitPriceService}</td>
                      </tr>
                      <tr>
                        <td>Dostępność</td>
                        <td>{list.quantity}</td>
                      </tr>
                    </thead>
                  </table>
                  <Button>Wypożycz</Button>
                </div>
              </div>
            )
          }
        })}
      </div>
      <Button fiveBtn={true}>Pełna Oferta Tutaj</Button>
    </Container>
  )
}