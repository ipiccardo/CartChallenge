import React from 'react'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../services/products'
import styles from './CardItemDesktop.module.css'
import Icon from '../../Icon/Icon'
import Pagination from '../../Pagination/Pagination'


const CardItemDesktop = () => {
    const [products, setProducts] = useState([])
    const [windowWidth, setWindowWidth] = useState<number>(0)

    const handleResize = () => setWindowWidth(window.screen.width)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            const { items } = data
            setProducts(items)
        }
        fetchData()
    }, []);

    console.log(products)

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])

    return (
        <>
        {
            windowWidth >= 500 &&
            <div className={styles.carrosEncontradosYRelevantes}>
            <p>393.566 carros encontrados</p>
            <div className={styles.masRelevantesEIconContainer}>
            <Icon name="flechas" onClick={() => { return }} size={18} />
                <p>Mais relevantes</p>
            </div>
        </div>
        }
            {
                products?.map(({ booking, brand = '', certificate, city, financing, id, image, mileage = '', model = '', price = '', promoted, state, version, year = '' }) =>{
                    const lowercaseBrand: string = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
                    const lowerCaseModel: string = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase()
                    return (
                        <div className={styles.cardItemContainer} key={id}>
                        <div className={styles.cardItemImageContainer}>
                            <div className={styles.cardItemImage} style={{ backgroundImage: `url(${image})` }}></div>
                            <button className={styles.cardItemImageButton}>
                                <div className={styles.iconContainer}>
                                    <Icon name="like" onClick={() => { return }} size={18} />
                                </div>
                            </button>
                        </div>
                        <div className={styles.cardItemContentContainer}>
                            <div className={styles.modalContainer}>
                            <div className={styles.yearModalContainer}>
                                <div>{year.substring(5)}</div>
                            </div>
                            <div className={styles.mileageModalContainer}>
                                <div>{mileage.toLocaleString()} km</div>
                            </div>
                            </div>
                            <div className={styles.brandVersionContainer}>
                                <p className={styles.brand}>{lowercaseBrand} {lowerCaseModel}
                                <span className={styles.version}>{version}</span>
                                </p>
                            </div>
                            <div className={styles.price}>R$ {price.toLocaleString()}</div>
                            <div className={styles.cityState}>
                                <div>{city}, {state}</div>
                            </div>
                            <div className={styles.simularParcelas}>
                            <Icon name="calculadora" onClick={() => { return }} size={18} />
                            <a href={'/'}>Simular Parcelas</a>
                            </div>
                        </div>
                    </div>
                )
            }
            )
        }
        <Pagination />
        </>
    )
}

export default CardItemDesktop