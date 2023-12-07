import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoBagAdd } from "react-icons/io5";

function ProductsFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    {
      defaultValues: {
        year: new Date().getFullYear(),
        price: 0.0
      }
    }
  );
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('year', product.year);
      }
    }

    loadProduct();
  }, [params.id, getProduct, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(data);
    }
    navigate('/products');
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white max-w-md w-full p-10 rounded-md shadow-lg">
        <form onSubmit={onSubmit}>
          <h1 className='text-3xl font-bold my-2 text-gray-800'>Productos</h1>

          <label htmlFor='name' className='block text-lg text-gray-700'>
            Nombre
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md my-2 focus:outline-none focus:border-sky-500 focus:bg-white"
            placeholder="Nombre del producto"
            {...register("name", { required: true })}
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500 text-sm">Nombre del producto requerido</div>
          )}

          <label htmlFor='price' className='block text-lg text-gray-700'>
            Precio
          </label>
          <input
            type="number"
            step="0.10"
            id="price"
            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md my-2 focus:outline-none focus:border-sky-500 focus:bg-white"
            placeholder="Precio del producto"
            {...register("price", {
              required: true,
              min: 0.0,
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <div className="text-red-500 text-sm">El precio mínimo es 0</div>
          )}

          <label htmlFor='year' className='block text-lg text-gray-700'>
            Año
          </label>
          <input
            type="number"
            max={new Date().getFullYear()}
            min="1900"
            step="1"
            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md my-2 focus:outline-none focus:border-sky-500 focus:bg-white"
            placeholder="Año del producto"
            {...register("year", {
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
              valueAsNumber: true,
            })}
          />

          {errors.year && (
            <div className="text-red-500 text-sm">Año del producto requerido</div>
          )}
          {errors.year?.type === 'min' && (
            <div className="text-red-500 text-sm">El año mínimo del producto es 1900</div>
          )}
          {errors.year?.type === 'max' && (
            <div className="text-red-500 text-sm">El año máximo es {new Date().getFullYear()}</div>
          )}

          <button
            className='bg-sky-500 text-white px-3 py-3 my-3 rounded-md hover:bg-sky-600 focus:outline-none'
            type="submit"
          >
            <IoBagAdd size={30} />
          </button>

        </form>
      </div>
    </div>
  );
}

export default ProductsFormPage;
