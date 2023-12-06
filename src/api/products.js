import axios from "./axios";

//llamada al api para pbtener todos los productos
export const getProductsRequest = () => axios.get('/productos');

//llamada al api para obtener producto por id
export const getProductRequest = (id) => axios.get('/productos/' + id);

//lamada al api para agregar un producto
export const createProductRequest = (product) => axios.post('/productos', product);

//llamada a la api para eliminar un producto
export const deleteProductRequest = (id) => axios.delete('/productos/' + id);

//llamada al api para editar un producto
export const updateProductRequest = (id, product) => axios.put('/productos/'+ id , product);



