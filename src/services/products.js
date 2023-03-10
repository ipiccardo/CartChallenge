const getProducts = async () => {
    const response = await fetch('https://mocki.io/v1/ddc770fd-1346-438e-a15f-cf8767577b9e');
    const data = await response.json();
    return data;
  };

  
  export { getProducts };