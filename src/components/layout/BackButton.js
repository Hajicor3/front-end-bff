import styles from './BackButton.module.css'

import { Link } from "react-router-dom"
import { TfiBackLeft } from "react-icons/tfi";

function BackButton({ to }) {
    return(
        <div className={styles.btn_container}>
            <Link to={to}>
                <TfiBackLeft />
            </Link>
        </div>
    )
}

export default BackButton