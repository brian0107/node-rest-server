// Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono.
const {Schema, model} = require('mongoose');

// Creacion del modelo usuario.

// Los modelos se definen a través de la interfaz Schema. Donde definimos la estructura de sus documentos y los tipos de datos que está almacenando.
const UsuarioShema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'El password es obligatorio']
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model( 'Usuario', UsuarioShema ); //model recibe el nombre singular de la coleccion para la que es el modelo y el esquema creado