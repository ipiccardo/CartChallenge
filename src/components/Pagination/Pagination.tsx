import styles from './Pagination.module.css'
import Icon from '../Icon/Icon'
import { useState } from 'react';

interface PaginationProps {
    handlePrevious: () => void;
    handleNext: () => void;
    handleSelect: (e:any) => void;

}

const Pagination = ({handlePrevious, handleNext, handleSelect}: PaginationProps) => {

    const pages = [1, 2, 3, 4, 5, 6, 7, 35,]

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
                    pages.map((page) => {
                        return (
                            <>
                                <div onClick={handleSelect}>{page}</div>
                            </>
                        )
                    })
                }
            </div>
            <div className={styles.proximoContainer} onClick={handleNext}>
                <div>Próximo</div>
                <Icon name="flechaDerecha" onClick={() => { return }} size={18} />
            </div>
        </div>
    )
}

export default Pagination