import styles from './BackButton.module.css'

import { Link, useNavigate } from "react-router-dom"
import { TfiBackLeft } from "react-icons/tfi";

function BackButton({ to }) {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return(
        <div className={styles.btn_container}>
            <button className={styles.btn} onClick={handleBack}><TfiBackLeft /></button>
        </div>
    )
}

export default BackButton