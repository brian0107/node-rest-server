const {Schema, model} = require('mongoose');

//Crear esquema para la coleccion roles
const RoleShema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

//El modelo recibe el nombre singular de la coleccion a la que pertenece y el esquema creado
module.exports = model ('Role', RoleShema); //Crea una colección con el nombre roles