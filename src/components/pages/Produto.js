import styles from './Produto.module.css'

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import ProdutoForm from "../produto/ProdutoForm"
import Container from '../layout/Container'
import MovimentacaoForm from '../movimentacao/MovimentacaoForm'
import Message from '../layout/Message'
import Button from '../form/Button'
import Loading from '../layout/Loading'
import MovimentacaoCard from '../movimentacao/MovimentacaoCard'
import BackButton from '../layout/BackButton'

function Produto() {
    const {id} = useParams()
    const navigate = useNavigate()
    const[produto, setProduto] = useState({})
    const[movimentacoes, setMovimentacoes] = useState([])
    const[visibleMovForm, setVisibleMovForm] = useState(false)
    const[visibleProdForm, setVisibleProdForm] = useState(false)
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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/produto/movimentacoes/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMovimentacoes(data)
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
        .then((resp) => resp.json())
        .then((data) => {
            setMovimentacoes((movAtuais) => [...movAtuais,data])

            if(data.tipoDeMovimentacao === 'ENTRADA'){
            produto.quantidade += data.quantidade
            }else{
                produto.quantidade -= data.quantidade
            }
            setMessage("Movimentação realizada!")
            setVisibleMovForm(!visibleMovForm)
        })
        .catch((err) => console.log(err))
    }

    function toggleEstoqueForm() {
        setVisibleMovForm(!visibleMovForm)
    }

     function toggleProdutoForm() {
        setVisibleProdForm(!visibleProdForm)
    }

    return (
        <>
            {produto.nomeProduto ? (
                <div className={styles.produto_detail}>
                    <Container customClass='column'>
                        <div className={styles.detail_container}>
                            <h1>Editar: {produto.nomeProduto}</h1>
                            <Button onClick={toggleProdutoForm} text={visibleProdForm ? 'fechar' : 'Editar Produto'} />
                            {!visibleProdForm ? (
                                <div className={styles.produto_info}>
                                    <p>
                                        <span>Nome: </span>{produto.nomeProduto}
                                    </p>

                                    <p>
                                        <span>Preço: </span> R${produto.preco}
                                    </p>

                                    <p>
                                        <span>Finalidade: </span>{produto.finalidade}
                                    </p>

                                    <p>
                                        <span>Status: </span>{produto.status}
                                    </p>

                                    <p>
                                        <span>Quantidade: </span>{produto.quantidade}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.produto_info}>
                                    <ProdutoForm produtoData={produto} btnText='Salvar edição' handleOnSubmit={salvarEdicao} />
                                </div>
                            ) }
                        </div>
                        <div className={styles.movimentacao_container}>
                            <h1>Registrar movimentação</h1>
                            <Button onClick={toggleEstoqueForm} text={visibleMovForm ? 'fechar' : 'Registrar'} />
                                <Message msg={message} type='success' />
                                {visibleMovForm && <MovimentacaoForm 
                                id={id} 
                                handleOnSubmit={salvarMovimentacao}
                                 />}
                        </div>
                        <h2>Movimentações</h2>
                        <Container customClass="start">
                            {movimentacoes.length > 0 && (
                                movimentacoes.map((item) => (
                                    <MovimentacaoCard
                                    data={item.data}
                                    quantidade={item.quantidade}
                                    tipoDeMov={item.tipoDeMovimentacao}
                                    key={item.id}
                                     />
                                ))
                            )}
                            {movimentacoes.length === 0 && <p>Não há movimentações registradas!!</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
            
        </>
    )
}

export default Produto