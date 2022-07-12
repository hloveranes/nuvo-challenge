import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../helper/index";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {

  const [productList, setProductList] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("products");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setProductList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`products`, JSON.stringify(data));
    }
  };

  const getProduct = (limit) => {
    setLoading(true);

    RouterApi.getProduct(limit)
      .then((res) => {
        const resData = res;
        setProductList(resData);
        setStorageData(resData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      }); 
  };


  return (
    <ProductContext.Provider
      value={{
        productList,
        loading,
        selected,
        setSelected,

        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
