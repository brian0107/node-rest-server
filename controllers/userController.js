const bcryptjs = require("bcryptjs");
const { response, request } = require("express"); // para tener el tipado (autocompletado de funciones)

const Usuario = require("../models/usuario"); // Importar modelo Usuario

const usuariosGet = async (req = request, res = response) => {
  //req.query obtiene los argumentos de la url ('?')
  const { limite = 5, desde = 0 } = req.query; // Argumentos opcionales para la query
  const query = { estado: true }; // Extraemos solo los registros con el estado 'true'

  // Con promise.all de ejecutan todas las promesas a la vez y con await esperamos a que todas terminen antes de pasar a imprimirlas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    // Devolvemos una respuesta con información tipo Json (Formato mas común y estandar).
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  //req.body almacena la informacion que el usuario envia.
  const { nombre, correo, password, rol } = req.body; // Extraemos solo lo que nos interesa. Ignoramos lo demas

  //Creamos una instancia de Usuario (objeto de mongoDB)
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar el usuario en la coleccion usuarios de la BD
  await usuario.save();
  //Enviamos una respuesta en formato JSON
  res.json({
    msg: 'Usuario creado correctamente',
    usuario, //Usuario creado
  });
};

const usuariosPut = async (req = request, res = response) => {
  // req. params contiene parámetros de ruta ('/')
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body; // Desestructuracion + rest para ignorar propiedades que no queremos actualizar.

  // Validar contra BD
  if (password) {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt); //Agregamos la propiedad 'password' y su valor será el contenido de password encriptado
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto); //Encuentra el registro por su id y lo actualiza segun los parametros enviados.
  res.json({
    msg: 'Usuario actualizado correctamente',
    usuario
  }); // Enviamos el usuario encontrado como respuesta
};

const usuariosDelete = async (req = request, res = response) => {

  const {id} = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false} );
  // Solo cambiamos su estado a false, de este modo no se mostrara el registro para quien utilize nuestro servicio rest pero mantenemos el registro en la BD para no perder su integridad referencial
  res.json({
    msg: "Usuario eliminado correctamente",
    usuario
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "patch API - Controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
