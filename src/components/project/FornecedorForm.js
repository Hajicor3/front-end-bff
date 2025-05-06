import styles from './FornecedorForm.module.css'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import { useState } from 'react'
import ErrorMessage from '../form/ErrorMessage';

function FornecedorForm({ handleSubmit, btnText, fornecedorData }) {
    const[fornecedor, setFornecedor] = useState(fornecedorData || []);
    const[error, setError] = useState(false)

    const submit = (e) => {
        e.preventDefault()

        if(!fornecedor.nome){
            setError(true)
        }
        else{
            setError(false)
            handleSubmit(fornecedor)
        }
    }

    function handleChange(e){
        setFornecedor({ ...fornecedor, [e.target.name] : e.target.value })
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
            type='text'
            text="Nome"
            placeHolder="Digite o nome do fornecedor"
            name="nome"
            handleOnChange={handleChange}
            value={fornecedor.nome ? fornecedor.nome : ''}
             />
             {error && <ErrorMessage txt='*O campo deve ser preenchido*'/>}
             <SubmitButton text={btnText} />
        </form>
    )
}

export default FornecedorForm