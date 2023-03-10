import React from 'react'
import styles from './Header.module.css'
import Icon from '../Icon/Icon'



const Header = (): any => {
    return (
        <>
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
        </>
    )
}

export default Header