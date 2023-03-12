import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import '../../styles/globals.css'
import SideBar from '../SideBar/SideBar';
import { useState, useEffect } from 'react';
import Filters from '../Filters/Filters';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import { Product } from '../../context/productsContext';

const Dashboard = () => {
    const { products, setProducts } = useContext(ProductsContext);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0)

    const handleResize = () => setWindowWidth(window.screen.width)

    const handleClick = () => {
        isOpenSideBar && setIsOpenSideBar(false)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    console.log(filteredProducts, 'productsfiltrados')

    return (
        <>
            <div onClick={handleClick}>
                <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
            </div>
            <div className='app-container'>
                <SideBar
                    isOpenSideBar={isOpenSideBar}
                    setIsOpenSideBar={setIsOpenSideBar}
                    setFilteredProducts={setFilteredProducts}
                    filteredProducts={filteredProducts} />
                {
                    windowWidth >= 500 && (
                        <>
                            <Filters />
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