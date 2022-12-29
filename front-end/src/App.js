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
import SendEmailResetPassword from "./routers/SendEmailResetPassword";
import ResetPassword from "./routers/ResetPassword";
import Home from "./routers/Home";
import DelateUser from "./routers/DelateUser";
import AdministrationPanel from "./routers/AdministrationPanel";
/* components */
import Container from "./components/Container";
import MyLink from "./components/MyLink";

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
          <div className={styles.zIndex}>
            <MyLink to="/"> <BiX onClick={() => userOption()} className={styles.iconClose} /></MyLink>
            <div className={styles.linkActionLogin}>
              <LoginAndSignUp userOption={() => userOption()}
                userData={userData}
                setUser={setUser} />
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/signup"
          element={
            <LoginAndSignUp
              userOption={() => userOption()}
              userData={userData}
              setUser={setUser} />
          } />
        <Route path="/reset-password/:token"
          element={
            <ResetPassword
              userOption={() => userOption()} />
          } />
        <Route path="/reset-password-email"
          element={
            <SendEmailResetPassword />
          } />
        <Route path="/administration"
          element={
            <AdministrationPanel
            userData={userData} />
          } />
        <Route path="/delate"
          element={
            <DelateUser
              userData={userData} />
          } />
        <Route path="/"
          element={
            <Home />
          } />
      </Routes>
    </Container>

  )
};