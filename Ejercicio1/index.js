
BASE_URL = 'https://thronesapi.com/api/v2/';
const fs = require('fs');

const getAllData = async () => {
    try {
        const response = await fetch(BASE_URL + 'Characters');
        if (!response.ok) {
            console.log('Ocurrió un error al obtener la información.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al intentar obtener datos', error);
    }
}

const getById = async (id) => {
    try {
        const response = await fetch(BASE_URL + 'Characters/' + id);
        if (!response.ok) {
            console.log('Ocurrió un error al obtener la información con id: ' + id);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al intentar obtener el elemento solicitado.', error);
    }
}

const findCharacter = async (fullName) => {
    try {
        const personajes = await getAllData();
        const character = personajes.find(item => item.fullName == fullName);
        if (!character) {
            console.log("No se encontró el personaje " + fullName);
        }
        console.log(character);
    } catch (error) {
        console.log('Error al intentar obtener el dato solicitado', error);
    }
}

const saveFile = async () => {
    try {
        const data = await getAllData();
        fs.writeFileSync('./personajes.json', JSON.stringify(data));
    } catch (error) {
        console.log('Error al intentar guardar el archivo.', error);
    }
}

const readFile = async () => {
    try {
        const personajes = fs.readFileSync('./personajes.json', 'utf-8');
        return JSON.parse(personajes);
    } catch (error) {
        console.log('Error al intentar leer el archivo.',error);
    }
}

const getFamily = async (family) => {
    try {
        const personajes = await readFile();
        personajes.forEach(element => {
            if (element.family === family){
                console.log(element);
            }
        });
    } catch (error) {
        console.log('Error al intentar obtener datos', error);
    }
}

const addCharacter = async (character) => {
    try {
        const personajes = await readFile();
        const lastId = personajes[personajes.length - 1].id;
        const newCharacter = {
            id : lastId + 1,
            firstName : character.firstName,
            lastName : character.lastName,
            fullName : character.fullName,
            title : character.title,
            family : character.family,
            image : null,
            imageUrl : null
        }
        personajes.push(newCharacter);
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes));
        console.log('Elemento agregado.');
    } catch (error) {
        console.log('Error al intentar agregar un nuevo elemento', error);
    }
}

const deleteCharactersFromId = async (startId) => {
    try {
        let personajes = await readFile();
        personajes = personajes.filter(element => element.id <= startId);
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes));
        console.log(`Los elementos con id mayor a ${startId} fueron eliminados`);
    } catch (error) {
        console.error('Error al intentar eliminar.', error);
    }
}

// Obtener todos los datos de la api
const allData = getAllData();
console.log(allData);

// Obtener por id
let data = getById(6);
console.log(data);

// Obtener datos y guardarlos en un archivo
saveFile();

// Obtener y mostrar el personaje Ned Stark
findCharacter("Ned Stark");

// Leer los datos desde el archivo
data = readFile();
console.log(data);

// Mostrar la familia Stark
family = getFamily('House Stark');
console.log(family);

// Agregar un nuevo personaje y sobreescribir el archivo
const newMan = {
    firstName : 'Harry',
    lastName : 'Potter',
    fullName : 'Harry Potter',
    title : 'Wizard',
    family : 'Griffindor',
    image : null,
    imageUrl : null
}
addCharacter(newMan);

// Eliminar los personajes desde el id 25 y sobreescribir el archivo
deleteCharactersFromId(25);