import styles from './Loading.module.css'

import loading from '../img/loading.svg'

function Loading() {
    return (
        <div className={styles.load_container}>
        <img src={loading} alt='loading' className={styles.load} />
        </div>
    )
}

export default Loading