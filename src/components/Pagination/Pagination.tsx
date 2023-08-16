import styles from './Pagination.module.css'
import Icon from '../Icon/Icon'
import { useEffect, useState } from 'react';
interface PaginationProps {
    handlePrevious: () => void;
    handleNext: () => void;
    handleSelect: (e: any, pageNumber?: any) => void;
    pageRendered?: number;
    activePage: number;
    carsForPage?: number
    filteredProducts?: any

}

const Pagination = ({ handlePrevious, handleNext, handleSelect, activePage, pageRendered, carsForPage, filteredProducts }: PaginationProps) => {

    const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

    console.log(activePage, 'activePage')
    // console.log(pageRendered, 'pageRendered')
    console.log(pages.length)

    console.log(pages.length - 1 < activePage)

    const calculatePages = (totalProducts: any) => {
        const itemsPerPage = 12;
        const pageCount = Math.ceil(totalProducts / itemsPerPage);
        console.log(pageCount)
        return Array.from({ length: pageCount }, (_, index) => index + 1);
    };


    useEffect(() => {
        setPages(calculatePages(filteredProducts.length));
    }, [filteredProducts]);

    return (
        <div className={styles.paginationContainer}>
            {
                pages.length > 1 ?
                    <div className={styles.anteriorContainer} onClick={handlePrevious}>
                        <Icon name="flechaIzquierda" onClick={() => { return }} size={18} />
                        <div>
                            Anterior
                        </div>
                    </div> :
                    <div className={styles.anteriorContainer}>
                        <Icon name="flechaIzquierda" onClick={() => { return }} size={18} />
                        <div>
                            Anterior
                        </div>
                    </div>
            }
            <div className={styles.numbersContainer}>
                {
                    pages.map((page, index) => {
                        const pageNumber = index + 1
                        return (
                            <div key={`${page} - ${index}`} onClick={(e) => handleSelect(e, pageNumber)} className={pageNumber === activePage ? styles.active : ''} >{page}</div>
                        )
                    })
                }
            </div>
            {
                <div className={styles.pageRenderInMobile}>{pageRendered}</div>
            }
            {

                pages.length !== activePage ?
                    (

                        <div className={styles.proximoContainer} onClick={handleNext}>
                            <div>Próximo</div>
                            <Icon name="flechaDerecha" onClick={() => { return }} size={18} />
                        </div>
                    ) : (
                        <div className={styles.proximoContainer}>
                            <div>Próximo</div>
                            <Icon name="flechaDerecha" onClick={() => { return }} size={18} />
                        </div>
                    )
            }
        </div>
    )
}

export default Pagination