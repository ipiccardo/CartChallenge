
import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import SideBar from '../SideBar/SideBar';

export default interface LayoutProps {
  children: React.ReactNode;
}


export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  return (
    <>
      <div className='main-content'>
        <SideBar isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
      <main>{children}</main>
      </div>
    </>
  );
};
