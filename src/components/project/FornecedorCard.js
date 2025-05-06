import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import styles from './FornecedorCard.module.css'

function FornecedorCard({ id, name, handelRemove }){

    function remove(e) {
        e.preventDefault()
        handelRemove(id)
    }

    return(
        <div className={styles.card_container}>
                <h4>{name}</h4>
            <div className={styles.action_card_container}>
                    <button onClick={remove}>
                        <BsFillTrashFill /> Deletar
                    </button>
                    <Link to={`/fornecedor/${id}`}>
                        <BsPencil />Editar
                    </Link>
            </div>
        </div>
    )
}

export default FornecedorCard