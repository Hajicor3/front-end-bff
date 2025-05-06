import styles from './Fornecedor.module.css'

import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../layout/Container'
import FornecedorForm from '../project/FornecedorForm'
import ProdutoForm from '../produto/ProdutoForm'
import ProdutoCard from '../produto/ProdutoCard'
import Message from '../layout/Message'

function Fornecedor() {
    const {id} = useParams()
    const[fornecedor, setFornecedor] = useState([])
    const[produtos, setProdutos] = useState([])
    const[message, setMessage] = useState()
    const[showFornecedorForm, setShowFornecedorForm] = useState(false)
    const[showProdutoForm, setShowProdutoForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8084/fornecedor/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setFornecedor(data)
            setProdutos(data.produtos)
        })
        .catch((err) => console.log(err, err))
    },[id])

    function editarFornecedor(fornecedor) {

        setMessage('')

        fetch(`http://localhost:8084/fornecedor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fornecedor)
        })
        .then(() => {
            setFornecedor(fornecedor)
            setShowFornecedorForm(!showFornecedorForm)
            setMessage('Fornecedor editado com sucesso!!')
        })
        .catch((err) => console.log(err))
    }

    function salvarProduto(produto) {
        
        fetch('http://localhost:8084/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProdutos((produtosAtuais) => [...produtosAtuais, data])
            setShowProdutoForm(!showProdutoForm)
        })
        .catch((err) => console.log(err))
    }

    function deletarProduto(id) {
        fetch(`http://localhost:8084/produto/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            setProdutos(produtos.filter((x) => x.id !== id))
        })
        .catch((err) => console.log(err))
    }

    function switchButtonFornecedor() {
       setShowFornecedorForm(!showFornecedorForm)
    }
    
    function switchButtonProduto() {
        setShowProdutoForm(!showProdutoForm)
     }

    return (
        <>
            {fornecedor.nome && (
                <div className={styles.project_details}>
                    {message && <Message msg={message} type='success' />}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Fornecedor: {fornecedor.nome}</h1>
                            <button onClick={switchButtonFornecedor} className={styles.btn} >
                                {!showFornecedorForm ? 'Editar Fornecedor' : 'Fechar'}
                            </button>
                            {showFornecedorForm && (
                                <div className={styles.project_info}>
                                    <FornecedorForm btnText='Salvar Alteração' handleSubmit={editarFornecedor} fornecedorData={fornecedor} />
                                </div>
                                )}
                        </div>
                        <div>
                            <h2>Adicionar um produto</h2>
                            <button onClick={switchButtonProduto} className={styles.btn} >
                            {!showProdutoForm ? 'Adicionar produto' : 'Fechar'}
                            </button>
                            {showProdutoForm && (
                                <div className={styles.project_info}>
                                    <ProdutoForm btnText='Salvar Produto' id={id} handleOnSubmit={salvarProduto} />
                                </div>
                            )}
                        </div>
                        <h2>Produtos</h2>
                        <Container customClass='start'>
                        {produtos.length === 0 && <p>Não há produtos cadastrados!</p>}
                        {produtos.length > 0 && produtos.map((produto) =>(
                            <ProdutoCard 
                            id={produto.id}
                            data={produto.data}
                            nome={produto.nomeProduto}
                            preco={produto.preco}
                            finalidade={produto.finalidade}
                            quantidade={produto.quantidade}
                            status={produto.status}
                            key={produto.id}
                            handleRemove={deletarProduto} />
                        ))}
                        </Container>
                        
                    

                    </Container>
                </div>
            )}
        </>
    )
}

export default Fornecedor