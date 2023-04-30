import { useEffect } from 'react'
import styles from './CardItemMobile.module.css'
import Icon from '../../Icon/Icon'
import { useContext, useState } from 'react';
import { ProductsContext } from '../../../context/productsContext';
import Pagination from '../../Pagination/Pagination'


export interface cardItemMobileProps {
    setTotalCarros: (filteredProducts: any) => void
    isOpenSideBar: boolean
    isInFavorite?: boolean
    setIsFiltered?: Function
}

const CardItemMobile = ({ setTotalCarros, isOpenSideBar, isInFavorite }: cardItemMobileProps) => {
    const {
        products,
        filteredProducts,
        favoriteArray,
        setFavoriteArray,
        filteredFavoriteArray,
        setFilteredFavoriteArray,
    } = useContext(ProductsContext);
    const [pageRendered, setPageRendered] = useState<number>(1)
    const [activePage, setActivePage] = useState<number>(1);
    const productsPerPage = 12;
    const lastProductIndex = pageRendered * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const productsToShow = !isInFavorite ? filteredProducts !== products ? filteredProducts.slice(firstProductIndex, lastProductIndex) : products.slice(firstProductIndex, lastProductIndex)
        : filteredFavoriteArray !== favoriteArray ? filteredFavoriteArray.slice(firstProductIndex, lastProductIndex) : favoriteArray.slice(firstProductIndex, lastProductIndex)

    useEffect(() => {
        setTotalCarros(filteredProducts.length)
    }, [setTotalCarros, filteredProducts])


    useEffect(() => {
        setActivePage(1)
        setPageRendered(1)
    }, [filteredProducts])

    useEffect(() => {
        setTotalCarros(filteredProducts.length)
    }, [setTotalCarros, filteredProducts])

    useEffect(() => {
        if (isInFavorite) {
            setFavoriteArray(JSON.parse(sessionStorage.getItem('favoriteArray') || '[]'));
            setFilteredFavoriteArray(JSON.parse(sessionStorage.getItem('filteredFavoriteArray') || '[]'))
        }
    }, [isInFavorite, setFavoriteArray, setFilteredFavoriteArray])

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


    const handleRemove = (id: any) => {
        const withoutRemoved = favoriteArray.filter((product) => product.id !== id)
        setFavoriteArray(withoutRemoved)
        sessionStorage.setItem('favoriteArray', JSON.stringify(withoutRemoved))
        setFilteredFavoriteArray(withoutRemoved)
        sessionStorage.setItem('filteredFavoriteArray', JSON.stringify(withoutRemoved))
    }

    const handleFavorite = (id: any) => {
        if (!isOpenSideBar) {
            const filteredFavoriteCard = filteredProducts.find((product) => product.id === id)
            if (filteredFavoriteCard) {
                const isFavorite = favoriteArray.some((favorite) => favorite.id === id)
                if (!isFavorite) {
                    setFavoriteArray((favoriteArray) => [...favoriteArray, filteredFavoriteCard])
                    setFilteredFavoriteArray((filteredFavoriteArray) => [...filteredFavoriteArray, filteredFavoriteCard])
                    sessionStorage.setItem('favoriteArray', JSON.stringify([...favoriteArray, filteredFavoriteCard]));
                    sessionStorage.setItem('filteredFavoriteArray', JSON.stringify([...filteredFavoriteArray, filteredFavoriteCard]));
                } else {
                    handleRemove(id)
                }
            }
        }
    }
    return (
        <>
            {

                productsToShow?.map(({
                    brand,
                    city,
                    id,
                    image,
                    mileage,
                    model,
                    price,
                    state,
                    version,
                    year,
                }) => {
                    const lowercaseBrand: string = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
                    const lowerCaseModel: string = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase()
                    return (
                        <div className={styles.cardItemContainer} key={id}>
                            <div className={styles.cardItemImageContainer}>
                                <div className={styles.cardItemImage} style={{ backgroundImage: `url(${image})` }}>
                                </div>
                                <button className={styles.cardItemImageButton}>
                                    <div className={styles.iconContainer}>
                                        {
                                            (filteredFavoriteArray.some((product) => product.id === id) ||
                                                favoriteArray.some((product) => product.id === id)) ? (
                                                <Icon name="likeLleno" onClick={() => handleFavorite(id)} size={18} />
                                            ) :
                                                <Icon name="like" onClick={() => handleFavorite(id)} size={18} />
                                        }
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
            {
                !isInFavorite ?
                    products.length >= 1 &&
                    <div style={{ width: '90%' }}>
                        <Pagination
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            handleSelect={handleSelect}
                            activePage={activePage}
                            pageRendered={pageRendered}
                        />
                    </div>
                    :
                    filteredFavoriteArray.length >= 1 ?
                        <div style={{ width: '90%' }}>
                            <Pagination
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                handleSelect={handleSelect}
                                activePage={activePage}
                                pageRendered={pageRendered}
                            />
                        </div>
                        :
                        <p className={styles.noProductsSelected}>No has seleccionado productos favoritos</p>
            }
        </>
    )
}

export default CardItemMobile