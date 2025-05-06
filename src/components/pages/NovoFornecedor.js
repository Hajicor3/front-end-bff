import styles from './NovoFornecedor.module.css'

import { useNavigate } from "react-router-dom"
import FornecedorForm from "../project/FornecedorForm"

function NovoFornecedor() {
    const navigate =useNavigate()

    function criarFornecedor(fornecedor) {
        
        if(fornecedor.length < 3) {
            return 0
        }

        fetch(`${process.env.REACT_APP_API_URL}/fornecedor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fornecedor)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/fornecedores', { state: { message: 'projeto criado com sucesso!' } })
        })
        .catch((err) => console.log(err))
    }

    return(
    <div className={styles.novofornecedor_container}>
       <h1>Criar fornecedor</h1> 
       <p>Crie o seu fornecedor para adicionar produtos vinculados a ele.</p>
       <FornecedorForm btnText="Salvar" handleSubmit={criarFornecedor}/>
    </div>
    )
}

export default NovoFornecedor