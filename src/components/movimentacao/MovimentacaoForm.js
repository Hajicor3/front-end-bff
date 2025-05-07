import styles from '../project/FornecedorForm.module.css'

import { useState } from "react"
import Input from "../form/Input"
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import ErrorMessage from '../form/ErrorMessage'

function MovimentacaoForm({ handleOnSubmit, id }) {
    const[movimentacao, setMovimentacao] = useState({})
    const[formErrors, setFormErrors] = useState({})

    const tipoMov = [
        { id: 0, nome: "ENTRADA"},
        {id: 1, nome: "SAIDA"}
    ]

    const submit = (e) => {
        e.preventDefault()

        const errors = {}

        if(!movimentacao.quantidade || movimentacao.quantidade <= 0) {
            errors.quantidade = true
        }

        if(!movimentacao.tipoDeMovimentacao || movimentacao.tipoDeMovimentacao.trim() === '') {
            errors.tipoDeMovimentacao = true
        }

        setFormErrors(errors)
        if(Object.keys(errors).length === 0) {
            handleOnSubmit({...movimentacao, idProduto: id })
        }
    }

    function handleChange(e) {
        setMovimentacao({...movimentacao, [e.target.name] : e.target.value})
        console.log(e.target.value)
    }

    return(
        <form className={styles.form} onSubmit={submit}>
            <Input 
            type='number'
            name='quantidade'
            placeHolder='quantidade da movimentação'
            text='quantidade'
            handleOnChange={handleChange}
             />
            {formErrors.quantidade && <ErrorMessage txt='A quantidade não pode ser zero ou menor que zero!'/>}

             <Select
             name='tipoDeMovimentacao'
             text='Tipo de movimentação'
             handleOnChange={handleChange}
             options={tipoMov}
             value={movimentacao.tipoDeMovimentacao}
              />
              {formErrors.tipoDeMovimentacao && <ErrorMessage txt='Você deve selecionar um tipo de movimentação!'/>}

              <SubmitButton
              text='confirmar'
               />
        </form>
    )
}

export default MovimentacaoForm