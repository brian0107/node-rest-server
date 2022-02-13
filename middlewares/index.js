//Archivo index donde tenemos la referencia a todos nuestros middlewares personalizados.

const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require("../middlewares/validar-jwt");
const validarRoles = require("../middlewares/validar-roles");
// ... con el spread operator, exportamos todas las funciones que exporte cada variable
module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
}