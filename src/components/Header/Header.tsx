import React, {useState, useEffect} from 'react'
import styles from './Header.module.css'
import Icon from '../Icon/Icon'



const Header = (): any => {
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const handleResize = () => setWindowWidth(window.screen.width)

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])
      
    

    return (
        <>
        {

            windowWidth <= 500 &&
            <div className={styles.headerContainer}>
                <div className={styles.buscarLink}>
                    <div className={styles.iconContainer}>
                        <Icon name="buscar" onClick={() => (<a href={'/'} />)} size={18} />
                    </div>
                    <a className={styles.link} href={'/'}>Buscar</a>
                </div>
                <div className={styles.lineaVertical}>
                    <Icon name="lineaVertical" onClick={() => (<a href={'/'} />)} size={18} />
                </div>
                <div className={styles.filtrarLink}>
                    <div className={styles.iconContainer}>
                        <Icon name="filtrar" onClick={() => (<a href={'/'} />)} size={18} />
                    </div>
                    <a className={styles.link} href={'/'}>Filtrar</a>
                </div>
            </div>
    }
        </>
    )
}

export default Header