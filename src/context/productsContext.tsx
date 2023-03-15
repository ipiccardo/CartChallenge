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
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
});

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const value = {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;