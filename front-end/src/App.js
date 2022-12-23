import React, { useState } from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import axios from "axios";

/* media style and icons*/
import { BiX } from "react-icons/bi";
import videoHeder from "./media/heder.mp4";
import styles from "./views/App.module.scss";

/* routers */
import Menu from "./routers/Menu";
import LoginAndSignUp from "./routers/LoginAndSignUp";

/* components */
import Container from "./components/Container";

export default function App() {
  const [stanUser, setStanUser] = useState("close");
  const [userData, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );
  axios.defaults.headers.common["x-auth-token"] = userData ? userData.jwt : "";


  const userOption = () => {
    if (stanUser === "close") {
      setStanUser("open")
    } else if (stanUser === "open") {
      setStanUser("close")
    }
  };
  return (
    <Container>
      <video className={styles.videoHeder} src={videoHeder} autoPlay loop muted />
      <Menu userOption={() => userOption()}
        userData={userData}
        setUser={setUser} />

      {/* login and registration */}
      {!userData && (
        <div className={styles[stanUser]}>
          <BiX onClick={() => userOption()} className={styles.iconClose} />
          <div className={styles.linkActionLogin}>
            <LoginAndSignUp
              userData={userData}
              setUser={setUser} />
          </div>
        </div>
      )}

    </Container>

  )
};