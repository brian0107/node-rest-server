const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");

const { generarJWT } = require('../helpers/generar-jwt');

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
    const token = await generarJWT( usuario.id );

    res.json({
      msg: "Login Ok",
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //Error del servidor
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
