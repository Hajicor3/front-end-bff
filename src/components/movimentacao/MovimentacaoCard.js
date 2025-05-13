import styles from '../produto/ProdutoCard.module.css'

function MovimentacaoCard({ tipoDeMov, id, data, idProduto, quantidade }) {
    return(
        <div className={styles.card_container}>
            <p>
                <span>Tipo: </span> {tipoDeMov}
            </p>

            <p>
                <span>Data do registro: </span> {data}
            </p>

            <p>
                <span>Quantidade: </span> {quantidade}
            </p>
        </div>
    )
}

export default MovimentacaoCard