import Icon from '../Icon/Icon'
import styles from './Filters.module.css'
import { useContext } from 'react'
import { ProductsContext } from '../../context/productsContext'
import { isFilteredProps } from '../../pages/favorite/favorite'
import { Product } from '../../context/productsContext'

type FilterProps = {
  isFiltered: Array<isFilteredProps>,
  setIsFiltered: Function
  isInFavorite?: boolean
}

const Filters = ({ isFiltered, setIsFiltered, isInFavorite }: FilterProps) => {
  const { products, setFilteredProducts, favoriteArray, setFilteredFavoriteArray, setTitle } = useContext(ProductsContext);

  const removeFilter = (index: number) => {
    setIsFiltered((prevFilteredProducts: any) => {
      const newFilteredProducts = [...prevFilteredProducts];
      newFilteredProducts.splice(index, 1);
      const filterProducts = (product: Product) => {
        for (let i = 0; i < newFilteredProducts.length; i++) {
          const property = newFilteredProducts[i].property;
          const value = newFilteredProducts[i].value;
          if (product[property] !== value) {
            return false;
          }
        }
        return true;
      };
      if (!isInFavorite) {
        const filteredProducts = products.filter(filterProducts);
        if (newFilteredProducts.length >= 1) {
          setFilteredProducts(filteredProducts);
        } else {
          setFilteredProducts(products);
        }
        return newFilteredProducts;
      } else {
        const filteredProducts = favoriteArray.filter(filterProducts);
        if (newFilteredProducts.length >= 1) {
          setFilteredFavoriteArray(filteredProducts);
        } else {
          setFilteredFavoriteArray(favoriteArray);
        }
        return newFilteredProducts;
      }
    });
  };
  const removeAll = () => {
    if (!isInFavorite) {
      setFilteredProducts(products)
      setIsFiltered([])
      setTitle('Mais Relevantes')
    } else {
      setIsFiltered([])
      setFilteredFavoriteArray(favoriteArray)
      setTitle('Mais Relevantes')
    }
  }

   return (
    <div className='desktopHeader'>
      <div className='Filters'>
        {
          isFiltered.length >= 1 && (
            <>
              {
                isFiltered.map((filtro, index) => {
                  return (
                    <div key={index}>
                      <div>{filtro.value}</div>
                      <Icon name="cerrar" onClick={() => removeFilter(index)} size={18} />
                    </div>
                  )
                })
              }
            </>
          )
        }
      </div>
      <div className={styles.limpiarFiltrosContainer} onClick={removeAll}>
        <Icon name="eliminar" onClick={removeAll} size={18} />
        <p>Limpiar Filtros</p>
      </div>
    </div>
  )
}

export default Filters