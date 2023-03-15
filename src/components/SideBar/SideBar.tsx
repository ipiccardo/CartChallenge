import { useState } from 'react';
import '../../styles/globals.css';
import style from './SideBar.module.css';
import Icon from '../Icon/Icon';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import { getUniqueFilters } from '../../helpers/switchs';
import { isFilteredProps } from '../Dashboard/Dashboard';

export type SidebarProps = {
    isOpenSideBar: boolean;
    setIsOpenSideBar: Function;
    setIsFiltered: Function,
    isFiltered: Array<isFilteredProps>
};

const SideBar = ({ isOpenSideBar, setIsOpenSideBar, setIsFiltered, isFiltered }: SidebarProps) => {
    const { products, setFilteredProducts, filteredProducts } = useContext(ProductsContext);
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
        setFilteredProducts(newFilteredProducts);
        const updatedIsFiltered = mapFilteredArray(property, value);
        if (findInFilteredArray(property)) {
            setIsFiltered(updatedIsFiltered);
        } else {
            setIsFiltered((prevFilteredProducts: typeof newFilteredProducts) => [...prevFilteredProducts, { property, value }])
        }
    }

    const handleShowEvery = () => {
        setFilteredProducts(products)
        setIsFiltered([])
    }

    const handleCountProperty = (property: string, value?: any) => {
        const totalDeProductos = filteredProducts.filter(producto =>
            producto[property] === value
        );
        const cantidadDeProductos = totalDeProductos.length;
        return cantidadDeProductos
    }

    // ORDENO EL FILTEREDPRODUCTS
    // const onFilteredPrice = () => {
    //     filteredProducts.sort((a, b) => a.price - b.price);
    //     return filteredProducts;
    // }



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
                                    return <li key={index} onClick={() => handlerFilter('brand', marca)}>{marca} {`(${(handleCountProperty('brand', marca))})`}</li>;
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
                                <ul className={style.dropdown}>
                                    {modelos.map((modelo, index) => {
                                        return <li key={index} onClick={() => handlerFilter('model', modelo)}>{modelo} {`(${(handleCountProperty('model', modelo))})`}</li>;
                                    })}
                                    <li onClick={() => { filteredProducts !== products && handleShowEvery() }}>Mostrar todo {`(${products.length})`}</li>
                                </ul>
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
                                        return <li key={index} onClick={() => handlerFilter('year', año)}>{año} {`(${(handleCountProperty('year', año))})`}</li>;
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
                                        return <li key={index} onClick={() => handlerFilter('version', version)}>{version} {`(${(handleCountProperty('version', version))})`}</li>;
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
                                    return <li key={index} onClick={() => handlerFilter('city', ciudad)}>{ciudad} {`(${(handleCountProperty('city', ciudad))})`}</li>;
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