import styles from './ErrorMessage.module.css'

function ErrorMessage({ txt }) {
    
    return(
        <div className={styles.error}>
            <p className={styles.text}>{txt}</p>
        </div>
    )
}

export default ErrorMessage