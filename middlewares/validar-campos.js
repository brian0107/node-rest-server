const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {

  const errors = validationResult(req); //Retorna un arreglo con los errores encontrados
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next(); //Si se cumplen las validaciones, seguimos con el siguiente middleware o si no hay otro, seguimos con el controlador. 
};

module.exports = {
    validarCampos
}