import { useEffect, useState } from 'react'
import styles from './Fornecedores.module.css'
import Container from '../layout/Container'
import ProdutoCardMin from '../produto/ProdutoCardMin'
import Loading from '../layout/Loading'

function Produtos() {
const[produtos, setProdutos] = useState([])
const[removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8084/produtos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProdutos(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    },[])

    return (
        <div className={styles.fornecedores_container}>
            <div className={styles.tittle_container}>
                <h1>Produtos</h1>
            </div>
            <Container customClass='start'>
                {produtos.length > 0 && produtos.map((produto) => (
                    <ProdutoCardMin  
                    id={produto.id} 
                    nome={produto.nomeProduto} 
                    preco={produto.preco}
                    key={produto.id} />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && produtos.length === 0 && (
                <p>Não há produtos registrados!</p>
                )}
            </Container>
        </div>
)
}

export default Produtos