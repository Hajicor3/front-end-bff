import styles from './Navbar.module.css'
import logo from '../img/estoqueIcon.png'

import { Link } from "react-router-dom"
import Container from "./Container"


function Navbar() {
    return (
        <nav className={styles.navbar_container}>
            <Container>
                <Link to='/'>
                <img src={logo} alt='logo do projeto' />
                </Link>
                <ul className={styles.list}>
                    <il className={styles.item}>
                        <Link to='/'>Home</Link>
                    </il>
                    <il className={styles.item}>
                        <Link to='/fornecedores'>Fornecedores</Link>
                    </il>
                    <il className={styles.item}>
                        <Link to='/produtos'>Produtos</Link>
                    </il>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar