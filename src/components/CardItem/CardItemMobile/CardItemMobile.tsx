import { useEffect } from 'react'
import { getProducts } from '../../../services/products'
import styles from './CardItemMobile.module.css'
import Icon from '../../Icon/Icon'
import { useContext } from 'react';
import { ProductsContext } from '../../../context/productsContext';
import { cardItemDestopProps } from '../CardItemDesktop/CardItemDesktop';

export interface cardItemMobileProps {
    setTotalCarros: (filteredProducts: any) => void
    isOpenSideBar: boolean
    isInFavorite?: boolean
}

const CardItemMobile = ({setTotalCarros, isInFavorite}: cardItemMobileProps) => {
    const { products, setProducts, filteredProducts } = useContext(ProductsContext);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            const { items } = data
            setProducts(items)
        }
        fetchData()
    }, [setProducts]);

    useEffect(() => {
        setTotalCarros(filteredProducts.length)
    }, [setTotalCarros, filteredProducts])
    
    return (
        <>
            {
                products?.map(({ booking, brand = '', certificate, city, financing, id, image, mileage = '', model = '', price = '', promoted, state, version, year = '' }) => {
                    const lowercaseBrand: string = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
                    const lowerCaseModel: string = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase()
                    return (
                        <div className={styles.cardItemContainer} key={id}>
                            <div className={styles.cardItemImageContainer}>
                                <div className={styles.cardItemImage} style={{ backgroundImage: `url(${image})` }}>
                                </div>
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
                                    <span>{city}, {state}</span>
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
        </>
    )
}

export default CardItemMobile