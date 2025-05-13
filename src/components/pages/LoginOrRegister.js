import Register from '../register/RegisterForm'
import styles from './LoginOrRegister.module.css'

function LoginOrRegister() {

    function registrar(dadosUsuario) {

        fetch(`${process.env.REACT_APP_API_URL}/cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUsuario)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => console.log(err))
    }


    return(
        <div className={styles.Login_register_container}>
            <h1>Registrar Usuário</h1>
            <Register handleOnSubmit={registrar} />
        </div>
    )
}

export default LoginOrRegister