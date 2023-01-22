import React, { useState } from "react";
/* component and style */
import Container from "../components/Container";
import styles from "../views/MyGallery.module.scss";
export default function MyGallery(props) {
    const [clickPhoto, setPhoto] = useState(props.oneMachine.mainPicture);
    return (
        <Container secundContainer={true}>
            <div className={styles.mainPhoto}>
                <img src={'http://localhost:8080/photo/' + clickPhoto} alt="foto gallery" />
            </div>
            <div className={styles.listPhoto}>
                {props.oneMachine.gallery.map((photo) => {
                    return (
                        <img onClick={() => setPhoto(photo.photo)} src={'http://localhost:8080/photo/' + photo.photo} alt="foto gallery" />
                    )
                })}
            </div>
        </Container>
    )
}