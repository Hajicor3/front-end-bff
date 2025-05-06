import styles from './Input.module.css'

function Input({ type, placeHolder, text, name, handleOnChange, value }) {
    return(
        <div className={styles.input_container}>
            <label htmlFor={name}>{text}:</label>
            <input 
            type={type} 
            placeholder={placeHolder} 
            id={name} 
            name={name}
            onChange={handleOnChange}
            value={value} />
        </div>
    )
}

export default Input