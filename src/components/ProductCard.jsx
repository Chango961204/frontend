import React from "react";
import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { IoTrashBinSharp, IoPencilSharp } from "react-icons/io5";
import { format } from "date-fns";

function ProductCard({ product }) {
    const { deleteProduct } = useProducts();

    const formattedCreatedAt = format(new Date(product.createdAt), "MMMM dd, yyyy HH:mm:ss");
    const formattedUpdatedAt = format(new Date(product.updatedAt), "MMMM dd, yyyy HH:mm:ss");

    return (
        <div className='bg-zinc-800 max-w-md w-full p-6 rounded-lg shadow-md'>
            <header className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold'>{product.name}</h1>
                <div className='flex gap-x-2 items-center'>
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md'
                        onClick={() => {
                            deleteProduct(product._id);
                        }}
                    >
                        <IoTrashBinSharp />
                    </button>
                    <Link
                        to={'/products/' + product._id}
                        className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md'
                    >
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>
            <p className='text-slate-300 my-2'>
                <span className="font-bold">Precio:</span> {product.price}
            </p>
            <p className='text-slate-300 my-2'>
                <span className="font-bold">Año:</span> {product.year}
            </p>
            <p className='text-slate-300 my-2'>
                <span className="font-bold">Fecha de Creación:</span> {formattedCreatedAt}
            </p>
            <p className='text-slate-300 my-2'>
                <span className="font-bold">Fecha de Modificación:</span> {formattedUpdatedAt}
            </p>
        </div>
    );
}

export default ProductCard;
