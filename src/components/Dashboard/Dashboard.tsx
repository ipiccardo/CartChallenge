import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import '../../styles/globals.css'
import SideBar from '../SideBar/SideBar';
import { useState, useEffect } from 'react';
import Filters from '../Filters/Filters';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';

export interface isFilteredProps {
    property: string,
    value: string,
}




const Dashboard = () => {
    const { products, setFilteredProducts } = useContext(ProductsContext);
    const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [isFiltered, setIsFiltered] = useState<isFilteredProps[]>([])

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
    }, [products]);

    const handleResize = () => setWindowWidth(window.screen.width)

    const handleClick = () => {
        isOpenSideBar && setIsOpenSideBar(false)
    }

    return (
        <>
            <div onClick={handleClick}>
                <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
            </div>
            <div className='app-container'>
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
                    <CardContainer />
                </div>
            </div>
        </>
    )
}

export default Dashboard