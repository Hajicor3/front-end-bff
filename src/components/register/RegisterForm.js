import styles from '../project/FornecedorForm.module.css'

import { useState } from "react"
import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton'
import ErrorMessage from '../form/ErrorMessage'

function Register({handleOnSubmit}) {
    const[registroUsuario, setRegistroUsuario] = useState({})
    const[formErrors, setFormErrors] = useState({})

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const validatePhone = (phone) => {
        const re = /^\s?\d{4,5}-?\d{4}$/
        return re.test(phone)
    }

    function handleChange(e) {
        setRegistroUsuario({...registroUsuario, [e.target.name] : e.target.value})
        console.log(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        const errors = []

        if(!registroUsuario.nome || registroUsuario.nome.trim() === '') {
            errors.nome = "O nome não pode ser em branco!"
        }

        if(!registroUsuario.cpf || registroUsuario.cpf.trim() === '' || registroUsuario.cpf.length < 11){
            errors.cpf = "O cpf deve ser válido!"
        }

        if(!validateEmail(registroUsuario.email)){
            errors.email = "O email deve ser válido!"
        }

        if(!validatePhone(registroUsuario.telefone)){
            errors.telefone = "Digite um telefone válido!"
        }

        if(!registroUsuario.senha || registroUsuario.senha.trim() === '' || registroUsuario.senha.length <= 6) {
            errors.senha = "Digite uma senha maior que 6 dígitos!"
        }

        setFormErrors(errors)

        if(Object.keys(formErrors).length === 0 ){
        handleOnSubmit(registroUsuario)
        }
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
            type='text'
            name='nome'
            text='Nome'
            placeHolder='Digite seu nome'
            handleOnChange={handleChange}
            />
            <ErrorMessage txt={formErrors.nome}/>

            <Input
            type='text'
            name='cpf'
            text='CPF'
            placeHolder='00000000000'
            handleOnChange={handleChange}
            />
            <ErrorMessage txt={formErrors.cpf}/>

            <Input
            type='text'
            name='email'
            text='Email'
            placeHolder='Digite seu email'
            handleOnChange={handleChange}
            />
            <ErrorMessage txt={formErrors.email}/>

            <Input
            type='text'
            name='telefone'
            text='Número de celular'
            placeHolder='(99) 9 9999-9999'
            handleOnChange={handleChange}
            />
            <ErrorMessage txt={formErrors.telefone}/>

            <Input
            type='password'
            name='senha'
            text='Senha'
            placeHolder='Insira uma senha'
            handleOnChange={handleChange}
            />
            <ErrorMessage txt={formErrors.senha}/>

            <SubmitButton text='Registrar' />
        </form>
    )
}

export default Register