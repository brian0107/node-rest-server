const Role = require("../models/role"); // Importar el modelo Role
const Usuario = require("../models/usuario"); //Importar el modelo Usuario

//Validaciones personalizadas que interactuan con la BD

// Verificar si el rol existe en la coleccion
const esRoleValido = async (rol = '') => {
  // Buscamos el rol en la coleccion roles con ayuda del modelo
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol '${rol}' no es válido`);
    }
  
};
// Verificar si el email ya existe en la coleccion
const emailExiste = async (correo = "") => {
  //Busca el correo en la coleccion usuarios con ayuda del modelo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado en la BD`);
  }
};
// Verificar si existe un usuario en la coleccion con el id enviado
const existeUsuarioPorId = async (id) => {
  //Busca el id en la coleccion usuarios con ayuda del modelo
  const existeUsuario = await Usuario.findById( id );
  if (!existeUsuario) {
    throw new Error(`El usuario con el id ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
};
