
import React, {useState} from 'react';

export default interface LayoutProps {
  children: React.ReactNode;
}


export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className='main-content'>
      <main>{children}</main>
      </div>
    </>
  );
};
