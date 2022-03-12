const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        //Error Bad request
        msg: "El usuario no existe - correo",
      });
    }
    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        //Error Bad request
        msg: "El usuario no existe - estado",
      });
    }
    // Verificar si la contraseña es correcta
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        //Error Bad request
        msg: "El password no es correcto - password",
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login Ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //Error del servidor
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {

  const { id_token } = req.body; //Obtener el token de google
  try {

    const {correo, nombre, img} = await googleVerify( id_token );
    let usuario = await Usuario.findOne({ correo });
    if(!usuario){
      //Crear usuario
      const data = {
        nombre,
        correo,
        password: ':P', //Necesario pero no importa lo que almacenemos.
        img,
        google: true
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    //Si el estado del usuario encontrado es false, significa que lo borraron o lo bloquearon.
    if (!usuario.estado){
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });

  } catch (error) { 
    res.status(400).json({
      ok: false,
      msg: 'El token de google no es válido'
    })
  }
}

module.exports = {
  login,
  googleSignIn,
};
