import styles from './Select.module.css'

function Select({ name, text, options, value, handleOnChange}) {
    return(
        <div className={styles.form_controll}>
            <label htmlFor={name}>{text}:</label>
            <select 
            name={name}
            id={name}
            onChange={handleOnChange}
            value={value || ''}
            >
                <option value='' disabled hidden>Selecione um status</option>
                {options.map((option) => (
                    <option value={option.id}key={option.id}> {option.nome} </option>
                ))}
            </select>
        </div>
    )
}

export default Select