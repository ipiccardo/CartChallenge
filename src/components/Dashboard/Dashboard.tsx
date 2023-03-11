import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import '../../styles/globals.css'
import SideBar from '../SideBar/SideBar';
import { useState, useEffect } from 'react';
import Filters from '../Filters/Filters';


const Dashboard = () => {

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


    return (
        <>
            <div onClick={handleClick}>
                <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
            </div>
            <div className='app-container'>
                <SideBar isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
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