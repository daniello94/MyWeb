import videoHeder from "../media/heder.mp4";
import styles from "../views/Video.module.scss"
export default function Video(){
    return(
        <div>
            <video className={styles.videoHeder} src={videoHeder} autoPlay loop muted />
        </div>
    )
}