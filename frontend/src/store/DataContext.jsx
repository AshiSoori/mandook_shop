import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tshirts, setTshirts] = useState([]);
  const [trousers, setTrousers] = useState([]);
  const [amazingProduct, setAmazingProduct] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/fetch_data.php")
      .then((res) => res.json())
      .then((data) => {
        setTshirts(data.tshirts || []);
        setTrousers(data.trousers || []);
        setAmazingProduct(data.amazingproduct || []);
        setProducts(data.products || []);
        // console.log("Fetched amazingProduct:", data.amazingproduct);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{ tshirts, trousers, amazingProduct, products }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
