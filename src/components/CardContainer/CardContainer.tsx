import { useEffect, useState } from 'react'
import styles from './CardContainer.module.css'
import CardItemMobile from '../CardItem/CardItemMobile/CardItemMobile'
import CardItemDesktop from '../CardItem/CardItemDesktop/CardItemDesktop'
import Icon from '../Icon/Icon'



interface DashboardProps {
  resultadosDeBusqueda?: number
  isOpenSideBar: boolean
}

const CardContainer = ({ resultadosDeBusqueda, isOpenSideBar}: DashboardProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [desktopMenu, setDesktopMenu] = useState<Boolean>(false)
  const [totalCarros, setTotalCarros] = useState<number>(0)

  const handleResize = () => setWindowWidth(window.screen.width)

  const handleClick = () => {
    if (!isOpenSideBar) {
      if (windowWidth < 500 && desktopMenu) {
        setDesktopMenu(false)
      } else {
        setDesktopMenu(!desktopMenu)
      }
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
              <div className={styles.cardContainerColumn}>
                <CardItemDesktop setTotalCarros={setTotalCarros} isOpenSideBar={isOpenSideBar}/>
              </div>
            </>
          )
          :
          <>
            <p className={styles.resultadosDeBusquedaParagraph}>{totalCarros ? totalCarros : '393.566'} resultados</p>
            <div className={styles.dashboardIconContainer}>
              <div>
                <Icon name="cuadrados" onClick={() => handleClick()} size={18} />
              </div>
            </div>
            {windowWidth < 500 && !desktopMenu ?
              <div className={styles.cardContainerRow}>
                <CardItemMobile setTotalCarros={setTotalCarros} isOpenSideBar={isOpenSideBar} />
              </div>
              :
              <div className={styles.cardContainerMobile}>
                <CardItemDesktop setTotalCarros={setTotalCarros} isOpenSideBar={isOpenSideBar}/>
              </div>
            }
          </>
      }
    </>
  )
}

export default CardContainer