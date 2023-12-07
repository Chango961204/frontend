// ProductsPage.js

import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0)
    return (<h1 className="text-center text-3xl mt-8">No hay productos para listar</h1>);

  return (
    <div className="container mx-auto my-8 bg-blue-600"> {/* Change bg-white to your desired color */}
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
