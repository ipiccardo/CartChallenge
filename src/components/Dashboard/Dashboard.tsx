import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import '../../styles/globals.css'
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';


const Dashboard = () => {

    const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

    const handleClick = () => {
        isOpenSideBar && setIsOpenSideBar(false)
    }


    return (
        <>
            <div onClick={handleClick}>
                <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
            </div>
            <div className='app-container'>
                <SideBar isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
                <div className='padding-h-1 CardContainer'>
                    <div onClick={handleClick}>
                        <CardContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard