// Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono.
const {Schema, model} = require('mongoose');

// Creacion del modelo usuario.

//Los modelos se definen a través de la interfaz Schema. Donde definimos la estructura de sus documentos y los tipos de datos que está almacenando.
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
        required: [true,'El rol es obligatorio']
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
/*Sobreescribimos el metodo toJSON para que cuando queramos imprimir nuestro modelo
 en formato JSON, lo imprima pero excluyendo __v, password. */
UsuarioShema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject(); // Tomamos la instancia actual del modelo en memoria y la convertimos en un objeto de JS. Para desestructurar el objeto y extraer solo lo que nos interesa con el operador rest (...).
    return usuario;
}
//Exportar el modelo
//model recibe el nombre singular de la coleccion a la que pertenece y el esquema creado
module.exports = model('Usuario', UsuarioShema ); //Crea una coleccion con el nombre usuarios