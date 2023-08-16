import styles from './Pagination.module.css'
import Icon from '../Icon/Icon'
interface PaginationProps {
    handlePrevious: () => void;
    handleNext: () => void;
    handleSelect: (e: any, pageNumber?: any) => void;
    pageRendered?: number;
    activePage: number

}

const Pagination = ({ handlePrevious, handleNext, handleSelect, activePage, pageRendered }: PaginationProps) => {

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.anteriorContainer} onClick={handlePrevious}>
                <Icon name="flechaIzquierda" onClick={() => { return }} size={18} />
                <div>
                    Anterior
                </div>
            </div>
            <div className={styles.numbersContainer}>
                {
                    pages.map((page, index) => {
                        const pageNumber = index + 1
                        console.log(page, 'page')
                        return (
                            <div key={`${page} - ${index}`} onClick={(e) => handleSelect(e, pageNumber)} className={pageNumber === activePage ? styles.active : ''} >{page}</div>
                        )
                    })
                }
            </div>
            {
                <div className={styles.pageRenderInMobile}>{pageRendered}</div>
            }
            <div className={styles.proximoContainer} onClick={handleNext}>
                <div>Próximo</div>
                <Icon name="flechaDerecha" onClick={() => { return }} size={18} />
            </div>
        </div>
    )
}

export default Pagination