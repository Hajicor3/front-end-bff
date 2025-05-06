import styles from './Produto.module.css'

import { useEffect, useState } from "react"
import ProdutoForm from "../produto/ProdutoForm"
import { useNavigate, useParams } from "react-router-dom"

function Produto() {
    const {id} = useParams()
    const navigate = useNavigate()
    const[produto, setProduto] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8084/produto/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProduto(data)
        })
        .catch((err) => console.log(err))

    },[id])

    function salvarEdicao(produto) {
     
        fetch(`http://localhost:8084/produto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        })
        .then((data) => {
            setProduto(data)
            navigate(`/fornecedores`, { state: { message: 'Produto atualizado!' } })
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.novofornecedor_container}>
            <h1>Editar produto</h1>
            <p>Edite o seu produto!</p>
            <ProdutoForm produtoData={produto} btnText='Salvar edição' handleOnSubmit={salvarEdicao} />
        </div>
    )
}

export default Produto