import styles from './Navbar.module.css'
import logo from '../img/icons8-the-legend-of-zelda-skyward-sword-200.svg'

import { Link } from "react-router-dom"
import Container from "./Container"

import { FaUser, FaHouse, FaBasketShopping, FaTruckMoving } from "react-icons/fa6";


function Navbar() {
    return (
        <nav className={styles.navbar_container}>
            <Container>
                <Link to='/'>
                <img src={logo} alt='logo do projeto' />
                </Link>
                <ul className={styles.list}>
                    <il className={styles.item}>
                        <Link to='/'><FaHouse /> Home</Link>
                    </il>
                    <il className={styles.item}>
                        <Link to='/fornecedores'><FaTruckMoving /> Fornecedores</Link>
                    </il>
                    <il className={styles.item}>
                        <Link to='/produtos'><FaBasketShopping /> Produtos</Link>
                    </il>
                    
                    <il className={styles.item}>
                            <Link to='/login-ou-registro'><FaUser /> Login</Link>
                    </il>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar