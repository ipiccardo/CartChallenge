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
  [key: string]: any;
};

type ProductsContextType = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const value = {
    products,
    setProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;