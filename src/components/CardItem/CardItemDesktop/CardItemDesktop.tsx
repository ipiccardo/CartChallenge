import { useEffect, useState } from 'react'
import styles from './CardItemDesktop.module.css'
import Icon from '../../Icon/Icon'
import Pagination from '../../Pagination/Pagination'
import { useContext } from 'react';
import { ProductsContext } from '../../../context/productsContext';
import karviImage from '../../../assets/karviImage.jpg'
import karviblanco from '../../../assets/karviblanco.jpg'
import terceraImagen from '../../../assets/terceraImagen.jpg'
import cuartaImagen from '../../../assets/cuartaImagen.jpg'
import { Link } from 'react-router-dom'

export interface cardItemDestopProps {
    setTotalCarros: (filteredProducts: any) => void
    isOpenSideBar: boolean
    isInFavorite?: boolean
    setIsFiltered: Function
}
export interface Images {
    [id: number]: string;
};

const CardItemDesktop = ({ setTotalCarros, isOpenSideBar, isInFavorite, setIsFiltered }: cardItemDestopProps) => {
    const {
        products,
        filteredProducts,
        setFilteredProducts,
        favoriteArray,
        setFavoriteArray,
        filteredFavoriteArray,
        setFilteredFavoriteArray,
        isDropdownOpenMasRelevantes,
        setIsDropdownOpenMasRelevantes,
        title,
        setTitle
    } = useContext(ProductsContext);
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [pageRendered, setPageRendered] = useState<number>(1)
    const [activePage, setActivePage] = useState<number>(1);
    const [isActive, setIsActive] = useState<any>({})
    const [images, setImages] = useState<Images>({})
    const handleResize = () => setWindowWidth(window.screen.width)
    const productsPerPage = 12;
    const lastProductIndex = pageRendered * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const productsToShow = !isInFavorite ? filteredProducts !== products ? filteredProducts.slice(firstProductIndex, lastProductIndex) : products.slice(firstProductIndex, lastProductIndex)
        : filteredFavoriteArray !== favoriteArray ? filteredFavoriteArray.slice(firstProductIndex, lastProductIndex) : favoriteArray.slice(firstProductIndex, lastProductIndex)

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

    const handleDropdownClick = (dropdownState: boolean, setDropdownState: Function,) => {
        setDropdownState(!dropdownState);
    };

    const handleFilterPriceMayorAMenor = () => {
        const arrayToSort = isInFavorite ? filteredFavoriteArray : filteredProducts;
        const sortedArray = [...arrayToSort].sort((a, b) => a.price - b.price);
        if (isInFavorite) {
            setFilteredFavoriteArray(sortedArray);
        } else {
            setFilteredProducts(sortedArray);
        }
        setTitle('Menor precio');
        return sortedArray;
    }

    const handleFilterPriceMenorAMayor = () => {
        const arrayToSort = isInFavorite ? filteredFavoriteArray : filteredProducts;
        const sortedArray = [...arrayToSort].sort((a, b) => b.price - a.price);
        if (isInFavorite) {
            setFilteredFavoriteArray(sortedArray);
        } else {
            setFilteredProducts(sortedArray);
        }
        setTitle('Mayor precio');
        return sortedArray;
    }

    const handleMoreRelevant = () => {
        setTitle('Mais Relevantes')
        if (isInFavorite) {
            setFilteredFavoriteArray(favoriteArray)
            setIsFiltered([])
        } else {
            setFilteredProducts(products)
            setIsFiltered([])
        }
    }


    const handleGalery = (image: string, index: number, id: number,) => {
        const imageNumberMatch = image.match(/Exterior_(\d+)\.jpg$/);
        if (imageNumberMatch) {
            const imageNumber = parseInt(imageNumberMatch[1]);
            const newIndexNumber = index === 0 || index === 1 ? 1 : (index + 1);
            const newImage = image.replace(
                `Exterior_${imageNumber}.jpg`,
                `Exterior_${newIndexNumber}.jpg`
            );
            setImages((prevImages) => ({
                ...prevImages,
                [id]: newImage,
            }));
            setIsActive((prevIsActive: any) => ({
                ...prevIsActive,
                [id]: id + '-' + index,
            }));
        } else {

            let newImage: any;
            if (index === 1) {
                newImage = image;
            } else if (index === 2) {
                newImage = terceraImagen;
            } else if (index === 3) {
                newImage = karviImage;
            } else if (index === 4) {
                newImage = karviblanco;
            } else if (index === 5) {
                newImage = cuartaImagen;
            }
            else {
                newImage = image;
            }
            setImages((prevImages) => ({
                ...prevImages,
                [id]: newImage,
            }));
            setIsActive((prevIsActive: any) => ({
                ...prevIsActive,
                [id]: id + '-' + index,
            }));
        }
    };

    console.log(filteredProducts.length / 12, 'cantidad de paginas')

    console.log(filteredProducts, 'filteredProducts')

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
                windowWidth >= 500 &&
                <div className={styles.carrosEncontradosYRelevantes}>
                    <p>{!isInFavorite ? filteredProducts.length : favoriteArray.length} carros encontrados</p>
                    <p className={styles.links}>{!isInFavorite ? <Link to='/favorite'>ir a Favoritos</Link> : <Link to='/'>ir al Home</Link>}</p>
                    <div className={styles.masRelevantesEIconContainer} onClick={() => handleDropdownClick(isDropdownOpenMasRelevantes, setIsDropdownOpenMasRelevantes)}>
                        <Icon name="flechas" onClick={() => { return }} size={18} />
                        <p id='dropdown-button'>{title}</p>
                        {
                            (
                                <ul id='dropdown-button' className={`${styles.masRelevantesUnorderList} ${isDropdownOpenMasRelevantes && `${styles.active}`}`} >
                                    <li onClick={() => handleMoreRelevant()}>Mais relevantes</li>
                                    <li onClick={() => handleFilterPriceMayorAMenor()}>Menor precio</li>
                                    <li onClick={() => handleFilterPriceMenorAMayor()}>Mayor precio</li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            }
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
                    const backgroundImage = images[id] || image;
                    return (
                        <div className={styles.cardItemContainer} key={id}>
                            <div className={styles.cardItemImageContainer}>
                                <div className={styles.cardItemImage} style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                }}>
                                    <div className={styles.cardItmeImageGalery}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span
                                                key={index}
                                                className={isActive[id] === id + '-' + (index + 1) || (index === 0 && !isActive[id]) ? `${styles.isActive}` : ''}
                                                onClick={() => handleGalery(image, index + 1, id)}
                                            />
                                        ))}
                                    </div>
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
                !isInFavorite ?
                    filteredProducts.length > 12 &&
                    <Pagination
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        handleSelect={handleSelect}
                        activePage={activePage}
                        pageRendered={pageRendered}
                    />
                    :
                    filteredFavoriteArray.length > 12 ?
                        <Pagination
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            handleSelect={handleSelect}
                            activePage={activePage}
                            pageRendered={pageRendered}
                        /> : !filteredFavoriteArray.length &&
                        <p className={styles.noProductsSelected}>No has seleccionado productos favoritos</p>
            }
        </>
    )
}

export default CardItemDesktop