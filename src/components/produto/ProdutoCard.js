import styles from './ProdutoCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProdutoCard({nome, id, preco, finalidade, status, data, quantidade, handleRemove  }) {

    function remove(e){
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.card_container}>
            <h4>{nome}</h4>
            <p>
                <span>Preço: </span> R${preco}
            </p>
            <p>
                <span>Finalidade: </span> {finalidade}
            </p>
            <p>
                <span>Status: </span> {status}
            </p>
            <p>
                <span>Data do registro: </span> {data}
            </p>
            <p>
                <span>Quantidade: </span> {quantidade}
            </p>
            <div className={styles.action_card_container}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Deletar
                </button>
                <Link to={`/produto/${id}`}>
                    <BsPencil /> Editar
                </Link>
            </div>
        </div>
    )
}

export default ProdutoCard