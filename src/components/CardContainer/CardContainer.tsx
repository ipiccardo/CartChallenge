import React from 'react'
import { useEffect, useState } from 'react'
import styles from './CardContainer.module.css'
import CardItemMobile from '../CardItem/CardItemMobile/CardItemMobile'
import CardItemDesktop from '../CardItem/CardItemDesktop/CardItemDesktop'
import Icon from '../Icon/Icon'
import Filters from '../Filters/Filters'


interface DashboardProps {
  resultadosDeBusqueda?: number
}

const CardContainer = ({ resultadosDeBusqueda }: DashboardProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [desktopMenu, setDesktopMenu] = useState<Boolean>(false)

  const handleResize = () => setWindowWidth(window.screen.width)

  const handleClick = () => {
    if (windowWidth < 500 && desktopMenu) {
      setDesktopMenu(false)
    } else {
      setDesktopMenu(!desktopMenu)
    }
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
      {
        windowWidth >= 500 ? 
        (
          <>
            {/* <div className={styles.limpiarFiltrosContainer}>
              <Icon name="eliminar" onClick={() => { return }} size={18} />
              <p> Limpiar Filtros</p>
            </div> */}
            <div className={styles.cardContainerColumn}>
              <CardItemDesktop />
            </div>
          </>
        )
          :
          <>
            <p className={styles.resultadosDeBusquedaParagraph}>{resultadosDeBusqueda ? resultadosDeBusqueda : '393.566'} resultados</p>
            <div className={styles.dashboardIconContainer}>
              <div>
                <Icon name="cuadrados" onClick={() => handleClick()} size={18} />
              </div>
            </div>
            {windowWidth < 500 && !desktopMenu ?
              <div className={styles.cardContainerRow}>
                <CardItemMobile />
              </div>
              :
              <div className={styles.cardContainerMobile}>
                <CardItemDesktop />
              </div>
            }
          </>
      }
    </>
  )
}

export default CardContainer