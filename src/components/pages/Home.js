import styles from './Home.module.css'
import image from '../img/HomeImg.png'

function Home() {
    return (
        <div className={styles.container}>
            <h1>Bem-vindo ao <span>Loggi</span></h1>
            <p> Registre seus fornecedores e produtos!!</p>
            <img src={image} alt='imagem do site'/>
        </div>
    )
}
export default Home