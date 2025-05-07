import styles from './Produto.module.css'

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import ProdutoForm from "../produto/ProdutoForm"
import Container from '../layout/Container'
import MovimentacaoForm from '../movimentacao/MovimentacaoForm'
import Message from '../layout/Message'
import Button from '../form/Button'

function Produto() {
    const {id} = useParams()
    const navigate = useNavigate()
    const[produto, setProduto] = useState({})
    const[visibleForm, setVisibleForm] = useState(false)
    const[message, setMessage] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/produto/${id}`, {
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
     
        fetch(`${process.env.REACT_APP_API_URL}/produto/${id}`, {
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

    function salvarMovimentacao(movimentacao) {

        setMessage('')

        fetch(`${process.env.REACT_APP_API_URL}/movimentacao`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(movimentacao)
        })
        .then((resp) => {
            resp.json()
            console.log(movimentacao)
            setMessage("Movimentação realizada!")
            setVisibleForm(!visibleForm)
        })
        .catch((err) => console.log(err))
    }

    function toggleEstoqueForm() {
        setVisibleForm(!visibleForm)
    }

    return (
        <div className={styles.novofornecedor_container}>
            <Container customClass='column'>
                    <h1>Editar produto</h1>
                    <p>Edite o seu produto!</p>
                <ProdutoForm produtoData={produto} btnText='Salvar edição' handleOnSubmit={salvarEdicao} />
            </Container>
            <div className={styles.movimentacao_container}>
                <div>
                    <h1>Movimentação</h1>
                    <p>Registre as movimentações do produto</p>
                    <Button onClick={toggleEstoqueForm} text={visibleForm ? 'fechar' : 'Registrar movimentação'} />
                </div>
                <Container>
                    <Message msg={message} type='success' />
                    {visibleForm && <MovimentacaoForm id={id} handleOnSubmit={salvarMovimentacao}/>}
                </Container>
            </div>
        </div>
    )
}

export default Produto