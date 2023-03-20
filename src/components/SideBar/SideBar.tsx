import { useState } from 'react';
import '../../styles/globals.css';
import style from './SideBar.module.css';
import Icon from '../Icon/Icon';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import { getUniqueFilters } from '../../helpers/switchs';
import { isFilteredProps } from '../../pages/favorite/favorite'

export type SidebarProps = {
    isOpenSideBar: boolean;
    setIsOpenSideBar: Function;
    setIsFiltered: Function,
    isFiltered: Array<isFilteredProps>
    isInFavorite?: boolean
};

const SideBar = ({ isOpenSideBar, setIsOpenSideBar, setIsFiltered, isFiltered, isInFavorite }: SidebarProps) => {
    const { products, setFilteredProducts, filteredProducts, favoriteArray, setFavoriteArray, filteredFavoriteArray, setFilteredFavoriteArray } = useContext(ProductsContext);
    const [isDropdownOpenMarca, setIsDropdownOpenMarca] = useState<boolean>(false);
    const [isDropdownOpenModelo, setIsDropdownOpenModelo] = useState<boolean>(false);
    const [isDropdownOpenAno, setIsDropdownOpenAno] = useState<boolean>(false);
    const [isDropdownOpenVersion, setIsDropdownOpenVersion] = useState<boolean>(false);
    const [isDropdownOpenCidade, setIsDropdownOpenCidade] = useState<boolean>(false);
    const marcas = getUniqueFilters(filteredProducts, "brand");
    const modelos = getUniqueFilters(filteredProducts, "model");
    const años = getUniqueFilters(filteredProducts, "year");
    const versiones = getUniqueFilters(filteredProducts, "version");
    const ciudades = getUniqueFilters(filteredProducts, "city");



    const handleDropdownClick = (dropdownState: boolean, setDropdownState: Function) => {
        setDropdownState(!dropdownState);
    };

    const findInFilteredArray = (property: string): boolean => isFiltered.some((object) => object.property === property)

    const mapFilteredArray = (property: string, newValue: any) => {
        const updatedArray = isFiltered.map((object) => {
            if (object.property === property) {
                return { ...object, value: newValue };
            }
            return object;
        });
        return updatedArray
    }



    const handlerFilter = (property: string, value: any) => {
        const newFilteredProducts = filteredProducts.filter((product) => product[property] === value);
        const newFilteredFavoriteProducts = favoriteArray.filter((product) => product[property] === value)
        setFilteredProducts(newFilteredProducts);
        setFilteredFavoriteArray(newFilteredFavoriteProducts)
        const updatedIsFiltered = mapFilteredArray(property, value);
        if (findInFilteredArray(property)) {
            setIsFiltered(updatedIsFiltered);
        } else {
            setIsFiltered((prevFilteredProducts: typeof newFilteredProducts) => [...prevFilteredProducts, { property, value }])
        }
    }

    const handleShowEvery = () => {
        if (!isInFavorite) {
            setFilteredProducts(products)
            setIsFiltered([])
        } else {
            setFilteredFavoriteArray(favoriteArray)
            setIsFiltered([])
        }
    }

    const handleCountProperty = (property: string, value?: any) => {
        if (!isInFavorite) {
            const totalDeProductos = filteredProducts.filter(producto =>
                producto[property] === value
            );
            const cantidadDeProductos = totalDeProductos.length;
            return cantidadDeProductos
        } else {
            const totalDeProductos = filteredFavoriteArray.filter(producto =>
                producto[property] === value
            );
            const cantidadDeProductos = totalDeProductos.length;
            return cantidadDeProductos > 0 ? cantidadDeProductos : null
        }
    }
    return (
        <div className={`Sidebar ${isOpenSideBar ? 'open' : ''}`}>
            <div className={style.listContainer}>
                <ul className={style.unorderList}>
                    <li>
                        <div onClick={() => handleDropdownClick(isDropdownOpenMarca, setIsDropdownOpenMarca)}>
                            Marca
                            <span className={`${isDropdownOpenModelo ? 'open'
                                : ''}`}>
                                {
                                    isDropdownOpenMarca ?
                                        <Icon name="dropup" onClick={() => { return }} size={18} />
                                        :
                                        <Icon name="dropdown" onClick={() => { return }} size={18} />
                                }
                            </span>
                        </div>
                        {isDropdownOpenMarca && (
                            <ul className={style.dropdown}>
                                {marcas.map((marca, index) => {
                                const cantidadDeProductos = handleCountProperty("brand", marca)
                                    return cantidadDeProductos && (
                                    <li key={index} onClick={() => handlerFilter('brand', marca)}>{marca}
                                        <span className={style.spanInListItem}>
                                            {`(${(handleCountProperty('brand', marca))})`}
                                        </span>
                                    </li>)
                                })}
                                <li onClick={() => { filteredProducts !== products && handleShowEvery() }}>Mostrar todo {`(${products.length})`}</li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div onClick={() => handleDropdownClick(isDropdownOpenModelo, setIsDropdownOpenModelo)}>
                            Modelo
                            <span className={`${isDropdownOpenModelo ? 'open' : ''}`}>
                                {
                                    isDropdownOpenModelo ?
                                        <Icon name="dropup" onClick={() => { return }} size={18} />
                                        :
                                        <Icon name="dropdown" onClick={() => { return }} size={18} />
                                }
                            </span>
                        </div>
                        {isDropdownOpenModelo && (
                            <ul className={style.dropdown}>
                                    {modelos.map((modelo, index) => {
                                        const cantidadDeProductos = handleCountProperty("model", modelo)
                                        return cantidadDeProductos && 
                                        <li className={style.productList} key={index} onClick={() => handlerFilter('model', modelo)}>{modelo}
                                        <span className={style.spanInListItem}>
                                         {`(${(handleCountProperty('model', modelo))})`}
                                        </span>
                                         </li>;
                                    })}
                                    <li onClick={() => { filteredProducts !== products && handleShowEvery() }}>Mostrar todo {`(${products.length})`}</li>
                                </ul>
                        )}
                    </li>
                    <li>
                        <div onClick={() => handleDropdownClick(isDropdownOpenAno, setIsDropdownOpenAno)}>
                            Año
                            <span className={`${isDropdownOpenModelo ? 'open' : ''}`}>
                                {
                                    isDropdownOpenAno ?
                                        <Icon name="dropup" onClick={() => { return }} size={18} />
                                        :
                                        <Icon name="dropdown" onClick={() => { return }} size={18} />
                                }
                            </span>
                        </div>
                        {isDropdownOpenAno && (
                            <ul className={style.dropdown}>
                                <ul className={style.dropdown}>
                                    {años.map((año, index) => {
                                        const cantidadDeProductos = handleCountProperty("year", año)
                                        return cantidadDeProductos && 
                                        <li key={index} onClick={() => handlerFilter('year', año)}>{año}
                                        <span className={style.spanInListItem}>
                                         {`(${(handleCountProperty('year', año))})`}
                                        </span>
                                         </li>;
                                    })}
                                    <li onClick={() => { filteredProducts !== products && handleShowEvery() }}>Mostrar todo {`(${products.length})`}</li>
                                </ul>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div onClick={() => handleDropdownClick(isDropdownOpenVersion, setIsDropdownOpenVersion)}>
                            Versión
                            <span className={`${isDropdownOpenModelo ? 'open' : ''}`}>
                                {
                                    isDropdownOpenVersion ?
                                        <Icon name="dropup" onClick={() => { return }} size={18} />
                                        :
                                        <Icon name="dropdown" onClick={() => { return }} size={18} />
                                }
                            </span>
                        </div>
                        {isDropdownOpenVersion && (
                            <ul className={style.dropdown}>
                                <ul className={style.dropdown}>
                                    {versiones.map((version, index) => {
                                       const cantidadDeProductos = handleCountProperty("version", version)
                                       return cantidadDeProductos && 
                                        <li key={index} onClick={() => handlerFilter('version', version)}>{version} 
                                        <span className={style.spanInListItem}>
                                        {`(${(handleCountProperty('version', version))})`}
                                        </span>
                                        </li>;
                                    })}
                                    <li onClick={() => { filteredProducts !== products && handleShowEvery() }}>Mostrar todo {`(${products.length})`}</li>
                                </ul>
                            </ul>
                        )}
                    </li>
                    <li>
                        <div onClick={() => handleDropdownClick(isDropdownOpenCidade, setIsDropdownOpenCidade)}>
                            Ciudad
                            <span className={`${isDropdownOpenModelo ? 'open' : ''}`}>
                                {
                                    isDropdownOpenCidade ?
                                        <Icon name="dropup" onClick={() => { return }} size={18} />
                                        :
                                        <Icon name="dropdown" onClick={() => { return }} size={18} />
                                }
                            </span>
                        </div>
                        {isDropdownOpenCidade && (
                            <ul className={style.dropdown}>
                                {ciudades.map((ciudad, index) => {
                                   const cantidadDeProductos = handleCountProperty("city", ciudad)
                                   return cantidadDeProductos &&
                                     <li key={index} onClick={() => handlerFilter('city', ciudad)}>{ciudad}
                                    <span className={style.spanInListItem}>
                                     {`(${(handleCountProperty('city', ciudad))})`}
                                    </span>
                                     </li>;
                                })}
                                <li onClick={() => { filteredProducts !== products && handleShowEvery() }}>Mostrar todo {`(${products.length})`}</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar