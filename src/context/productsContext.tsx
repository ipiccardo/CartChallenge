import React, { createContext, useState, ReactNode } from "react";

export type Product = {
  id: number,
  booking: string,
  brand: string,
  certificate: string,
  city: string,
  financing: number,
  image: string,
  mileage: number,
  model: string,
  price: number,
  promoted: string,
  state: string,
  version: number,
  year: string,
  description: string,
  [key: string]: string | number;
};

type ProductsContextType = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  filteredProducts: Product[],
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  favoriteArray: Product[],
  setFavoriteArray: React.Dispatch<React.SetStateAction<Product[]>>,
  filteredFavoriteArray: Product[],
  setFilteredFavoriteArray: React.Dispatch<React.SetStateAction<Product[]>>,
  isDropdownOpenMasRelevantes: boolean,
  setIsDropdownOpenMasRelevantes: React.Dispatch<React.SetStateAction<boolean>>
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  favoriteArray: [],
  setFavoriteArray: () => {},
  filteredFavoriteArray: [],
  setFilteredFavoriteArray: () => {},
  isDropdownOpenMasRelevantes: false,
  setIsDropdownOpenMasRelevantes: () => true,
  title: 'Mais Relevantes',
  setTitle: () => {}
});

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [favoriteArray, setFavoriteArray] = useState<Product[]>([]);
  const [filteredFavoriteArray, setFilteredFavoriteArray] = useState<Product[]>(favoriteArray);
  const [isDropdownOpenMasRelevantes, setIsDropdownOpenMasRelevantes] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('Mais Relevantes')


  const value = {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    favoriteArray,
    setFavoriteArray,
    filteredFavoriteArray,
    setFilteredFavoriteArray,
    isDropdownOpenMasRelevantes,
    setIsDropdownOpenMasRelevantes,
    title,
    setTitle,
  };


  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;