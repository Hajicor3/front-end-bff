import styles from './ProdutoCardMin.module.css'

import { Link } from 'react-router-dom'

function ProdutoCardMin({ nome, id, preco }) {
    return(
        <div className={styles.card_container}>
            <Link to={`/produto/${id}`}>
                <h4>{nome}</h4>
            </Link>
            <p>
                <span>Preço: </span> R${preco}
            </p>
        </div>
    )
}

export default ProdutoCardMin