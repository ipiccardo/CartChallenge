import { useEffect, useState } from 'react'
import { getProducts } from '../../../services/products'
import styles from './CardItemDesktop.module.css'
import Icon from '../../Icon/Icon'
import Pagination from '../../Pagination/Pagination'
import { useContext } from 'react';
import { ProductsContext } from '../../../context/productsContext';


export interface cardItemDestopProps {
    setTotalCarros: (filteredProducts: any) => void
}


const CardItemDesktop = ({ setTotalCarros }: cardItemDestopProps) => {
    const { products, setProducts, filteredProducts } = useContext(ProductsContext);
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [pageRendered, setPageRendered] = useState<number>(1)
    const [activePage, setActivePage] = useState<number>(1);
    const [isDropdownOpenMasRelevantes, setIsDropdownOpenMasRelevantes] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false)
    const handleResize = () => setWindowWidth(window.screen.width)
    const productsPerPage = 12;
    const lastProductIndex = pageRendered * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const productsToShow = filteredProducts !== products ? filteredProducts.slice(firstProductIndex, lastProductIndex) : products.slice(firstProductIndex, lastProductIndex);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            const { items } = data
            setProducts(items)
        }
        fetchData()
    }, [setProducts]);

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        setActivePage(1)
        setPageRendered(1)
    }, [filteredProducts])

    useEffect(() => {
        setTotalCarros(filteredProducts.length)
    }, [setTotalCarros, filteredProducts])


    const handleNext = (): void => {
        if (pageRendered < 9) {
            setActivePage(activePage + 1);
            setPageRendered(pageRendered + 1);
        } else {
            setActivePage(9);
        }
    };

    const handlePrevious = (): void => {
        if (pageRendered > 1) {
            setActivePage(activePage - 1);
            setPageRendered(pageRendered - 1);
        } else {
            setActivePage(1);
        }
    };

    const handleSelect = (e: any, pageNumber?: any): void => {
        e.target.innerText !== '...' ?
            setPageRendered(parseInt(e.target.innerText))
            :
            setPageRendered(7)
        setActivePage(pageNumber)
    }

    const handleDropdownClick = (dropdownState: boolean, setDropdownState: Function) => {
        setDropdownState(!dropdownState);
        setIsActive(!isActive)
    };

    const handleFilterPriceMayorAMenor = () => {
        const mayorAMenor = filteredProducts.sort((a, b) => a.price - b.price)
        console.log(mayorAMenor, 'mayorAMenor')
        return mayorAMenor;
    }

    const handleFilterPriceMenorAMayor = () => {
        const menorAMayor = filteredProducts.sort((a, b) => b.price - a.price)
        console.log(menorAMayor, 'menorAMayor')
        return menorAMayor;
    }

    return (
        <>
            {
                windowWidth >= 500 &&
                <div className={styles.carrosEncontradosYRelevantes}>
                    <p>{filteredProducts.length} carros encontrados</p>
                    <div className={styles.masRelevantesEIconContainer} onClick={() => handleDropdownClick(isDropdownOpenMasRelevantes, setIsDropdownOpenMasRelevantes)}>
                        <Icon name="flechas" onClick={() => { return }} size={18} />
                        <p>Mais relevantes</p>
                        {
                     (
                                <ul className={`${styles.masRelevantesUnorderList} ${isDropdownOpenMasRelevantes && `${styles.active}`}`} >
                                    <li>Mais relevantes</li>
                                    <li onClick={() => handleFilterPriceMayorAMenor()}>Menor precio</li>
                                    <li onClick={() => handleFilterPriceMenorAMayor()}>Mayor precio</li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            }
            {
                productsToShow?.map(({ booking, brand = '', certificate, city, financing, id, image, mileage = '', model = '', price = '', promoted, state, version, year = '' }) => {
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
            {
                products.length > 1 &&
                <Pagination
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    handleSelect={handleSelect}
                    activePage={activePage} />
            }
        </>
    )
}

export default CardItemDesktop