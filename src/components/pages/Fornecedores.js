import { useEffect, useState } from "react"
import FornecedorCard from "../project/FornecedorCard"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

import styles from "./Fornecedores.module.css"
import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import Loading from "../layout/Loading"

function Fornecedores() {
    const[fornecedores, setFornecedores] = useState([])
    const[removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_URL}/fornecedores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setFornecedores(data)
            setRemoveLoading(true)
        })
        .catch(err => console.log(err))

    },[])

    function removerFornecedor(id) {
        fetch(`${process.env.REACT_APP_API_URL}/fornecedor/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            setFornecedores(fornecedores.filter((x) => x.id !== id))
        })
        .catch(err => {
            console.log(err)
            setRemoveLoading(true)
        })
    }

    return (
        <div className={styles.fornecedores_container}>
            <div className={styles.tittle_container}>
                <h1>Fornecedores</h1>
                <LinkButton to="/novofornecedor" text="Novo Fornecedor"/>
            </div>
            {message && <Message msg={message} type='success' />}
            <Container customClass="start">
                {fornecedores.length > 0 && fornecedores.map( x => (
                    <FornecedorCard
                    id={x.id}
                    name={x.nome}
                    key={x.id}
                    handelRemove={removerFornecedor}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && fornecedores.length === 0 && (
                    <p>Não há fornecedores cadastrados!!</p>
                )}
            </Container>
        </div>
    )
}

export default Fornecedores