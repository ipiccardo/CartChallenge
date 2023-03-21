import {useState, useEffect} from 'react'
import styles from './Header.module.css'
import Icon from '../Icon/Icon'
import { Link } from 'react-router-dom';


export type SidebarProps = {
    isOpenSideBar: boolean;
    setIsOpenSideBar: Function;
    isInFavorite?: boolean
};


const Header = ({isOpenSideBar, setIsOpenSideBar, isInFavorite}:SidebarProps)  => {
        const [windowWidth, setWindowWidth] = useState<number>(0)
    const handleResize = () => setWindowWidth(window.screen.width)

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])

      const handleClick = () => {
        setIsOpenSideBar(!isOpenSideBar)
      }
    

    return (
        <>
        {

            windowWidth <= 500 &&
            <div className={styles.headerContainer}>
                <div className={styles.buscarLink}>
                    <div className={styles.iconContainer}>
                        <Icon name="buscar" onClick={() => {return}} size={18} />
                    </div>
                    {
                        isInFavorite ?
                        <Link className={styles.link} to={'/'}>Home</Link>
                        :
                        <Link className={styles.link} to={'/favorite'}>Buscar</Link> 
                    }
                </div>
                <div className={styles.lineaVertical}>
                    <Icon name="lineaVertical" onClick={() => {return}} size={18} />
                </div>
                <div className={styles.filtrarLink}>
                    <div className={styles.iconContainer}>
                        <Icon name="filtrar" onClick={handleClick} size={18} />
                    </div>
                    <span className={styles.link} onClick={handleClick}>Filtrar</span>
                </div>
            </div>
    }
        </>
    )
}

export default Header