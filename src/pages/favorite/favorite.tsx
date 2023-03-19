import Dashboard from '../../components/Dashboard/Dashboard';
import { useState } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import { Link } from 'react-router-dom';

export const Favorite = () => {
    const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

    const favoriteProps = {
        isInFavorite: true
    }

    const handleClick = () => {
        isOpenSideBar && setIsOpenSideBar(false)
    }

        return (
        <>
        <Link to='/'>Ir a Home</Link>
        <Dashboard {...favoriteProps}>
                <div className='CardContainer' onClick={handleClick}>
                    <CardContainer isOpenSideBar={isOpenSideBar}/>
                </div>
            </Dashboard>
        </>
    )
}

export default Favorite