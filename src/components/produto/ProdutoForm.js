import styles from '../project/FornecedorForm.module.css'

import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import ErrorMessage from '../form/ErrorMessage'

function ProdutoForm({ btnText, handleOnSubmit, produtoData, id }) {
    const[produto, setProduto] = useState({fornecedorId: id} || [])
    
    useEffect(() => {
        if(produtoData) {
            setProduto(produtoData)
        }
    },[produtoData])

    const[formErrors, setFormErrors] = useState({})

    const status = [
        { id: 0, nome: 'ATIVO' },
        { id: 1, nome: 'INATIVO' }
    ]

    const submit = (e) => {
        e.preventDefault()

        const errors = {}

        if(!produto.nomeProduto || produto.nomeProduto.length < 3){
            errors.nome = true
        }

        if(produto.preco <= 0 || produto.preco === undefined){
            errors.preco = true
        }

        if(!produto.finalidade || produto.finalidade.trim() === ''){
            errors.finalidade = true
        }

        if(!produto.status || produto.status.trim() === ''){
            errors.status = true
        }

        setFormErrors(errors)
        if(Object.keys(errors).length === 0){
            handleOnSubmit(produto)
        }
    } 

    function handleChange(e){
        setProduto({ ...produto, [e.target.name] : e.target.value })
        
        console.log(e.target.value)
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type='text' 
            name='nomeProduto' 
            placeHolder='Digite o nome do produto' 
            text='Nome'
            handleOnChange={handleChange}
            value={produto ? produto.nomeProduto : ''}
                />
             {formErrors.nome && <ErrorMessage txt='*O campo deve ser preenchido*'/>}

             <Input 
             type='number' 
             name='preco' 
             text='Preço' 
             placeHolder='Informe o preço do produto'
             handleOnChange={handleChange}
             value={produto ? produto.preco : ''}
              />
            {formErrors.preco && <ErrorMessage txt='*O preço não pode ser menor ou igual a 0!!*'/>}

            <Input 
             type='text' 
             name='finalidade' 
             text='Finalidade' 
             placeHolder='Informe a finalidade'
             handleOnChange={handleChange}
             value={produto ? produto.finalidade : ''}
              />
            {formErrors.finalidade && <ErrorMessage txt='*O campo deve ser preenchido*'/>}
              

              <Select 
              name='status' 
              text='Status'
              handleOnChange={handleChange}
              value={produto ? produto.status : ''}
              options={status} 
              />
              {formErrors.status && <ErrorMessage txt='*Selecione uma opção*'/>}

              <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProdutoForm