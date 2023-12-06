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
      //console.log(params);
      if (params.id) {
        const product = await getProduct(params.id);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('year', product.year);
        //getProduct(params.id);
      }
    }

  }, [])
  //console.log(products);

  const onSubmit = handleSubmit((data) => {
    //console.log(data);
    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(data);
    }
    navigate('/products');
  })

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className='text-3xl font-bold my-2'>Productos</h1>
          <label htmlFor='name'>Nombre</label>
          <input type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del producto"
            {
            ...register("name", { required: true })
            }
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500">Nombre del producto requerido</div>
          )}

          <label htmlFor='price'>Precio</label>
          <input type="number" step="0.10" id="price"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Precio del producto"
            {
            ...register("price", {
              required: true,
              min: 0.0,
              valueAsNumber: true,
            })
            }
          />
          {errors.price && (
            <div className="text-red-500">El precio minumo es 0</div>
          )}

          <label htmlFor='year'>Año</label>
          <input type="number" max={new Date().getFullYear()} min="1900" step="1"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Año del producto"
            {
            ...register("year", {
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
              valueAsNumber: true,
            })
            }
          />

          {errors.year && (
            <div className="text-red-500">Año del producto requerido</div>
          )}
          {errors.year?.type === 'min' && (
            <div className="text-red-500">El año minumo del producto es 1900</div>
          )}
          {errors.year?.type === 'max' && (
            <div className="text-red-500">El año maximo es {new Date().getFullYear()}</div>
          )}

          <button className='bg-zinc-700 px-3 py-3 my-3 rounded-md' type="submit">

            <IoBagAdd size={30} />

          </button>

        </form>
      </div>
    </div>
  )
}

export default ProductsFormPage