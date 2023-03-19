import Dashboard from '../../components/Dashboard/Dashboard'
import CardContainer from '../../components/CardContainer/CardContainer'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

    const homeProps = {
        isInFavorite: false
    }


    const handleClick = () => {
        isOpenSideBar && setIsOpenSideBar(false)
    }

    return (
        <div>
            <Link to='/favorite'>Ir a favoritos</Link>
            <Dashboard {...homeProps}>
                <div className='CardContainer' onClick={handleClick}>
                    <CardContainer isOpenSideBar={isOpenSideBar} />
                </div>
            </Dashboard>
        </div>
    )
}

export default HomePage