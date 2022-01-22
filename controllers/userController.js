const { response, request } = require("express"); // para tener el tipado (autocompletado de funciones) 

const usuariosGet = (req = request, res = response) => {
    const { nombre, edad = 18} = req.query; // Obtenemos los parametros de la url con el method GET. Podemos definir valores por defecto
  res.json({
    // Devolvemos una respuesta con información tipo Json (Formato mas común y estandar).
    msg: "get API - Controller",
    nombre,
    edad
  });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body; //Obtenemos la info que el usuario envia. Extraemos solo lo que nos interesa
  res.json({
    msg: "post API - Controller",
    nombre,
    edad,
  });
};

const usuariosPut = (req, res) => {
    const {id} = req.params; // Obtenemos el valor que tenga el parametro obligatorio id en la url method PUT
  res.json({
    msg: "put API - Controller",
    id
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - Controller",
  });
};

const usuariosPatch = (req, res) => {
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
