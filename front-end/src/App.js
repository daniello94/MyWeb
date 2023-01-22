import React, { useState, useEffect } from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import axios from "axios";

/* media style and icons*/
import { BiX } from "react-icons/bi";
import styles from "./views/App.module.scss";

/* routers */
import Menu from "./routers/Menu";
import LoginAndSignUp from "./routers/LoginAndSignUp";
import SendEmailResetPassword from "./routers/SendEmailResetPassword";
import ResetPassword from "./routers/ResetPassword";
import Home from "./routers/Home";
import DelateUser from "./routers/DelateUser";
import AdministrationPanel from "./routers/AdministrationPanel";
import Video from "./routers/Video";
/* components */
import Container from "./components/Container";
import MyLink from "./components/MyLink";

export default function App() {
  const [stanUser, setStanUser] = useState("close");
  const [isOnPage, setIsOnPage] = useState(false);
  const [classNameMenu, setClassNameMenu] = useState("initialClass")
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
  const handleIsOnPageChange = (value) => {
    setIsOnPage(value);
  }
  console.log(isOnPage, "app");

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset / document.body.offsetHeight;
    if (scrollPosition > 0.2) {
      setClassNameMenu('activeClass');
    } else {
      setClassNameMenu('initialClass');
    }
  };

  return (
    <div className={styles.contentApp}>
      <Video />
      <Menu userOption={() => userOption()}
        userData={userData}
        setUser={setUser}
        activeClassMenu={classNameMenu}
        menuAdministrationPanel={isOnPage} />
      <Container>
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
                userOption={() => userOption()}
                onIsOnPageChange={handleIsOnPageChange} />
            } />
          <Route path="/reset-password-email"
            element={
              <SendEmailResetPassword
                onIsOnPageChange={handleIsOnPageChange} />
            } />
          <Route path="/administration"
            element={
              <AdministrationPanel
                userData={userData}
                onIsOnPageChange={handleIsOnPageChange} />
            } />
          <Route path="/delate"
            element={
              <DelateUser
                userData={userData}
                onIsOnPageChange={handleIsOnPageChange} />
            } />
          <Route path="/"
            element={
              <Home
                onIsOnPageChange={handleIsOnPageChange} />
            } />
        </Routes>
      </Container>
    </div>

  )
};