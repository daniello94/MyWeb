import React, { useState, useEffect } from "react";
import axios from "axios";
/* routers */
import MyGallery from "./MyGallery";
/* components and style*/
import Container from "../components/Container";
import MainHeder from "../components/MainHeder";
import MainSecondHeder from "../components/MainSecoundHeder";
import styles from "../views/Home.module.scss";
import { BiX } from "react-icons/bi";
import MyLink from "../components/MyLink";

export default function Home(props) {
  const [listEquipment, setListEquipment] = useState([]);
  const [oneMachine, setMachine] = useState({
    gallery: []
  })
  const [gallery, setGallery] = useState(false)
  const { onIsOnPageChange } = props;

  const equipmentList = () => {
    axios.post("http://127.0.0.1:8080/equipment/all")
      .then((res) => {
        setListEquipment(res.data)
      })
  };

  const openGallery = (_id) => {
    axios.get("http://127.0.0.1:8080/equipment/" + _id)
      .then((res) => {
        setMachine(res.data)
        setGallery(true)
      })

  }
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
    <Container>
      <Container forContainer={true}>
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
                  <div className={styles.mainPicture} onClick={() => openGallery(list._id)}>
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
                          <td>Model</td>
                          <td>{list.model}</td>
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
                    <MyLink fiveLink={true} to={`/addOrders/${list._id}`}>Wypożycz Teraz</MyLink>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <MyLink to={"/toolList"} sixLink={true}>Pełna Oferta Tutaj</MyLink>
      </Container>
      {/* gallery */}
      {gallery === true && (
        <Container tenContainer={true}>
          <div className={styles.offGallery}>
            <BiX onClick={() => setGallery(false)} className={styles.iconClose} />
          </div>
          <MyGallery oneMachine={oneMachine} />
        </Container>
      )}
    </Container>
  )
}