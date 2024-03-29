import { useEffect, useState, useContext } from 'react'
import styles from './CardContainer.module.css'
import CardItemMobile from '../CardItem/CardItemMobile/CardItemMobile'
import CardItemDesktop from '../CardItem/CardItemDesktop/CardItemDesktop'
import Icon from '../Icon/Icon'
import { ProductsContext } from '../../context/productsContext'
import { getProducts } from '../../services/products'



interface DashboardProps {
  resultadosDeBusqueda?: number
  isOpenSideBar: boolean
  isInFavorite?: boolean
  setIsFiltered: Function 
}

const CardContainer = ({ resultadosDeBusqueda, isOpenSideBar, isInFavorite, setIsFiltered }: DashboardProps) => {
  const {favoriteArray, setProducts} = useContext(ProductsContext);
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [desktopMenu, setDesktopMenu] = useState<Boolean>(false)
  const [totalCarros, setTotalCarros] = useState<number>(0)
  
  useEffect(() => {         
    const fetchData = async () => {
        const data = await getProducts()
        const { items } = data
        setProducts(items)
    } 
      fetchData()
}, [setProducts]);

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
                <CardItemDesktop setTotalCarros={setTotalCarros} isOpenSideBar={isOpenSideBar} isInFavorite={isInFavorite} setIsFiltered={setIsFiltered}/>
              </div>
            </>
          )
          :
          <>
            <p className={styles.resultadosDeBusquedaParagraph}>{!isInFavorite ? totalCarros : favoriteArray.length} resultados</p>
            <div className={styles.dashboardIconContainer}>
              <div>
                <Icon name="cuadrados" onClick={() => handleClick()} size={18} />
              </div>
            </div>
            {windowWidth < 500 && !desktopMenu ?
              <div className={styles.cardContainerRow}>
                <CardItemMobile setTotalCarros={setTotalCarros} isOpenSideBar={isOpenSideBar} isInFavorite={isInFavorite} setIsFiltered={setIsFiltered}/>
              </div>
              :
              <div className={styles.cardContainerMobile}>
                <CardItemDesktop setTotalCarros={setTotalCarros} isOpenSideBar={isOpenSideBar} setIsFiltered={setIsFiltered} isInFavorite={isInFavorite}/>
              </div>
            }
          </>
      }
    </>
  )
}

export default CardContainer