import { useState, useEffect } from 'react';
import '../../styles/globals.css';
import style from './SideBar.module.css';
import Icon from '../Icon/Icon';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import { getUniqueFilters } from '../../helpers/switchs';

export type SidebarProps = {
    isOpenSideBar: boolean;
    setIsOpenSideBar: Function;
};

const SideBar = ({ isOpenSideBar, setIsOpenSideBar}: SidebarProps) => {
    const { products, setProducts, setFilteredProducts, filteredProducts } = useContext(ProductsContext);
    const [isDropdownOpenMarca, setIsDropdownOpenMarca] = useState(false);
    const [isDropdownOpenModelo, setIsDropdownOpenModelo] = useState(false);
    const [isDropdownOpenAno, setIsDropdownOpenAno] = useState(false);
    const [isDropdownOpenVersion, setIsDropdownOpenVersion] = useState(false);
    const [isDropdownOpenCidade, setIsDropdownOpenCidade] = useState(false);
    const marcas = getUniqueFilters(products, "brand");
    const modelos = getUniqueFilters(products, "model");
    const años = getUniqueFilters(products, "year");
    const versiones = getUniqueFilters(products, "version");
    const ciudades = getUniqueFilters(products, "city");



    const handleDropdownClick = (dropdownState: boolean, setDropdownState: Function) => {
        setDropdownState(!dropdownState);
    };

    // const handlerFilter = (property: string, value: any) => {
    //     setProducts(products.filter((product) => product[property] === value));
    //     console.log(value, 'value');
    // }

    const handlerFilter = (property: string, value: any) => {
        const newFilteredProducts = products.filter((product) => product[property] === value);
        setFilteredProducts(newFilteredProducts);
        console.log(value, 'value');
    }

    console.log(filteredProducts, 'productoFiltrado')

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
                                    return <li key={index} onClick={() => handlerFilter('brand', marca)}>{marca}</li>;
                                })}
                                <li onClick={() => { filteredProducts !== products ? setFilteredProducts(products) : setFilteredProducts(filteredProducts) }}>Mostrar todo</li>
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
                                        return <li key={index} onClick={() => handlerFilter('model', modelo)}>{modelo}</li>;
                                    })}
                                <li onClick={() => { filteredProducts !== products ? setFilteredProducts(products) : setFilteredProducts(filteredProducts) }}>Mostrar todo</li>
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
                                        return <li key={index} onClick={() => handlerFilter('year', año)}>{año}</li>;
                                    })}
                                <li onClick={() => { filteredProducts !== products ? setFilteredProducts(products) : setFilteredProducts(filteredProducts) }}>Mostrar todo</li>
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
                                        return <li key={index} onClick={() => handlerFilter('version', version)}>{version}</li>;
                                    })}
                                <li onClick={() => { filteredProducts !== products ? setFilteredProducts(products) : setFilteredProducts(filteredProducts) }}>Mostrar todo</li>
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
                                    return <li key={index} onClick={() => handlerFilter('city', ciudad)}>{ciudad}</li>;
                                })}
                                <li onClick={() => { filteredProducts !== products ? setFilteredProducts(products) : setFilteredProducts(filteredProducts) }}>Mostrar todo</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar