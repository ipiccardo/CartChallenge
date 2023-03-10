import { Product } from "../context/productsContext";


export function getUniqueFilters(filteredProducts: Product[], property: keyof Product): any[] {
    switch (property) {
      case "brand":
      case "model":
      case "year":
      case "city":
        return filteredProducts.map((product) => product[property])
                       .filter((value, index, array) => array.indexOf(value) === index)
                       .sort();
      case "version":
        return filteredProducts.map((product) => product[property])
                       .filter((value, index, array) => array.indexOf(value) === index)
                       .sort((a, b) => a - b);
      default:
        return [];
    }
  }