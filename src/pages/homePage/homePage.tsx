import CardContainer from '../../components/CardContainer/CardContainer';
import Header from '../../components/Header/Header';
import '../../styles/globals.css'
import SideBar from '../../components/SideBar/SideBar';
import { useState, useEffect } from 'react';
import Filters from '../../components/Filters/Filters'
import { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import styles from './homePage.module.css'

export interface isFilteredProps {
    property: string,
    value: string,
}
export interface DashboardProps {
    children: React.ReactNode;
}

const HomePage = () => {
    const { products, setFilteredProducts, isDropdownOpenMasRelevantes, setIsDropdownOpenMasRelevantes } = useContext(ProductsContext);
    const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [isFiltered, setIsFiltered] = useState<isFilteredProps[]>([])
    const [isInFavorite, setIsInFavorite] = useState<boolean>(false)

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (products.length > 90) {
            setFilteredProducts(products);
        }
    }, [products, setFilteredProducts]);

    const handleResize = () => setWindowWidth(window.screen.width)

    const handleClick = () => {
        isOpenSideBar && setIsOpenSideBar(false)
    }

    const handleClose = (e: any) => {
        if (e.target.id !== 'dropdown-button') {
            setIsDropdownOpenMasRelevantes(false)
        }
    }

    return (
        <>
            <div onClick={handleClick} className={styles.inMobile}>
                <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
            </div>
            <div className='app-container' onClick={(e) => handleClose(e)}>
                <SideBar
                    isOpenSideBar={isOpenSideBar}
                    setIsOpenSideBar={setIsOpenSideBar}
                    setIsFiltered={setIsFiltered}
                    isFiltered={isFiltered}
                />
                {
                    windowWidth >= 500 && (
                        <>
                            <Filters
                                setIsFiltered={setIsFiltered}
                                isFiltered={isFiltered}
                            />
                        </>
                    )
                }
                <div className='CardContainer' onClick={handleClick}>
                    <CardContainer isOpenSideBar={isOpenSideBar} isInFavorite={false} setIsFiltered={setIsFiltered}/>
                </div>




            </div>
        </>
    )
}

export default HomePage