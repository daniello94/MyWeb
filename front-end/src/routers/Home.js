/* routers */
import Container from "../components/Container";
/* components and style*/
import MainHeder from "../components/MainHeder";
import MainSecondHeder from "../components/MainSecoundHeder";
import styles from "../views/Home.module.scss";
export default function Home() {
    return (
        <Container forContainer={true}>
            <MainHeder>Wypożyczalnia narzędzi</MainHeder>
            <p className={styles.sloganText}>"Zawsze gotowi do pracy, zawsze gotowi do wynajmu"</p>
            <div className={styles.textHeder}>
                <MainSecondHeder>Zapoznaj sie z naszą ofertą</MainSecondHeder>
                <p>Nie chcesz tracić pieniędzy na zakup drogich narzędzi, które rzadko używasz? Nasza wypożyczalnia oferuje szeroki wybór sprzętu budowlanego w atrakcyjnych cenach. Zadzwoń do nas lub zarezerwuj online już dziś i ciesz się profesjonalnym sprzętem bez konieczności jego zakupu!</p>
            </div>
        </Container>
    )
}