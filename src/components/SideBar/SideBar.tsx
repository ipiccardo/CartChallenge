import React, { useState } from 'react';
import '../../styles/globals.css';
import style from './SideBar.module.css';
import Icon from '../Icon/Icon';

export type SidebarProps = {
    isOpenSideBar: boolean;
    setIsOpenSideBar: Function;
};

const SideBar = ({ isOpenSideBar, setIsOpenSideBar }: SidebarProps) => {
    const [isDropdownOpenMarca, setIsDropdownOpenMarca] = useState(false);
    const [isDropdownOpenModelo, setIsDropdownOpenModelo] = useState(false);
    const [isDropdownOpenAno, setIsDropdownOpenAno] = useState(false);
    const [isDropdownOpenVersion, setIsDropdownOpenVersion] = useState(false);
    const [isDropdownOpenCidade, setIsDropdownOpenCidade] = useState(false);

    const handleDropdownClick = (dropdownState: boolean, setDropdownState: Function) => {
        setDropdownState(!dropdownState);
    };

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
                                <li>Marca opción 1</li>
                                <li>Marca opción 2</li>
                                <li>Marca opción 3</li>
                            </ul>
                        )}
                        <hr />
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
                                <li>Modelo opción 1</li>
                                <li>Modelo opción 2</li>
                                <li>Modelo opción 3</li>
                            </ul>
                        )}
                         <hr />
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
                                <li>Año opción 1</li>
                                <li>Año opción 2</li>
                                <li>Año opción 3</li>
                            </ul>
                        )}
                         <hr />
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
                                <li>Versión opción 1</li>
                                <li>Versión opción 2</li>
                                <li>Versión opción 3</li>
                            </ul>
                        )}
                         <hr />
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
                                <li>Ciudad opción 1</li>
                                <li>Ciudad opción 2</li>
                                <li>Ciudad opción 3</li>
                            </ul>
                        )}
                         <hr />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar