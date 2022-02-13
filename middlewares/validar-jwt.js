const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
  //Obtenemos el token del header
  const token = req.header("x-token"); 

  if (!token) { //Error 401 Unauthorized 
    return res.status(401).json({
      msg: "No hay token en la petición - token",
    });
  }
  
  try {
    //Verificamos que el token sea válido y obtenemos el uid del usuario que se autentico y genero ese token.
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // leer el usuario que corresponde al uid del token 
    const usuario = await Usuario.findById(uid);

    //Verificar que exista un usuario con el id del token
    if (!usuario){
      return res.status(401).json({
        msg: 'Token no válido - no existe usuario en BD'
      })
    }
    //Verificar si el uid tiene estado true
    if (!usuario.estado){
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false'
      })
    }
    // Una vez validado el token creamos la propiedad usuario en el request para que los siguientes middlewares tengan acceso al usuario y puedan validar mas cosas.
    req.usuario = usuario;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido"
    });
  }

};

module.exports = {
  validarJWT,
};
