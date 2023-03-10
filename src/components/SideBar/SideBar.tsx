import React from 'react'

type SidebarProps = {
    isOpenSideBar: boolean;
    setIsOpenSideBar: Function;
};


const SideBar = ({ isOpenSideBar, setIsOpenSideBar }: SidebarProps) => {
    return (
        <div className={`SideBar ${isOpenSideBar ? "open" : ""}`}>
            <ul>
                <li>Elemento 1</li>
                <li>Elemento 2</li>
                <li>Elemento 3</li>
            </ul>

        </div>
    )
}

export default SideBar