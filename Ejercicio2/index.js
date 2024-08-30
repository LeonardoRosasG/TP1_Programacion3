const BASE_URL = 'https://fakestoreapi.com/';

const getAll = async () => {
    try {
        const response = await fetch(BASE_URL + 'products');
        if (!response.ok) {
            console.log('Error al intentar obtener los datos');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Se produjo un error en la conexión', error);
    }
}

const getSomeProducts = async (limit) => {
    try {
        const response = await fetch(BASE_URL + 'products?limit=' + limit);
        if (!response.ok){
            console.log('Error al intentar obtener los datos');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Se produjo un error en la conexión', error);
    }
}

const addProduct = async (product) => {
    try {
        const response = await fetch(BASE_URL + 'products',{
            method: 'POST',
            body: JSON.stringify(product)
        });
        if (!response.ok){
            console.log('Error al intentar obtener los datos');
        }
        const data = await response.json();
        console.log('Producto agregado con id ', data.id);
    } catch (error) {
        console.error('Se produjo un error en la conexión', error);
    }
}

const getById = async (id) => {
    try {
        const response = await fetch(BASE_URL + 'products/' + id);
        if (!response.ok){
            console.log('Error al intentar obtener los datos');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Se produjo un error en la conexión', error);
    }
}

const deleteById = async (id) => {
    try {
        const response = await fetch(BASE_URL + 'products/' + id,{
            method: 'DELETE'
        });
        if (!response.ok){
            console.log('Error al intentar obtener los datos');
        }
        const data = await response.json();
        console.log(`Producto con id ${data.id} eliminado.`);
    } catch (error) {
        console.error('Se produjo un error en la conexión', error);
    }
}

// Obtener todos los productos
getAll();

// Obtener cierta cantidad de productos
getSomeProducts(5);

// Agregar un nuevo producto
const newProduct = {
    title: 'PC gamer',
    price: 2999.99,
    description: 'PC gamer con Intel Celeron N95',
    image: null,
    category: 'info'
}
addProduct(newProduct);

// Obtener un producto por id
getById(3);

// Eliminar un producto segun su id
deleteById(3);