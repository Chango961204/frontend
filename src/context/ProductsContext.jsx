import { createContext, useContext, useState } from "react";
import { createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest } from "../api/products";

const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts debe estar dentro de un ProductsProvider")

    }
    return context;
}

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])

    const createProduct = async (product) => {
        //console.log(product);
        const res = await createProductRequest(product);
        console.log(res);
    }

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
            //console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            //console.log(res.data);
            if (res.status === 200)
                setProducts(products.filter(product => product._id != id));
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id)
            //console.log(res);
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateProduct = async (id, product) =>{
        try{
            await updateProductRequest(id, product);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <ProductsContext.Provider value={{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProduct,
            updateProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}