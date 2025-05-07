import styles  from './Button.module.css'


function Button({ text, onClick }) {
    return (
        <div className={styles.btn_container}>
            <button className={styles.btn} onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button