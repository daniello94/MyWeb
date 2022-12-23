import styles from '../views/Error.module.scss';

const Error =(props)=>{
    return(
        <p className={`${styles.error} ${props.isAlternative && styles.correctError}`}>
            {props.children}
        </p>
    )
}
export default Error;