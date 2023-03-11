import styles from './Pagination.module.css'
import Icon from '../Icon/Icon'

const Pagination = () => {

    const pages = [1, 2, 3, 4, 5, 6, 7, 35,]

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.anteriorContainer}>
                <Icon name="flechaIzquierda" onClick={() => { return }} size={18} />
                <div>
                    Anterior
                </div>
            </div>
            <div className={styles.numbersContainer}>
                {
                    pages.map((page) => {
                        return (
                            <>
                                <div>{page}</div>
                            </>
                        )
                    })
                }
            </div>
            <div className={styles.proximoContainer}>
                <div>Próximo</div>
                <Icon name="flechaDerecha" onClick={() => { return }} size={18} />
            </div>
        </div>
    )
}

export default Pagination