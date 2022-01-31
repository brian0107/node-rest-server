const { Router } = require("express"); //Extraemos la funcion Router para utlizar Middleware de nivel de direccionador
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/userController");


const router = Router();

router.get("/", [
  check('limite', 'El limite debe ser un numero entero').isInt().optional(),
  check('desde', 'Desde debe ser un numero entero').isInt().optional(),
  validarCampos
], usuariosGet);

// Moddleware check valida y almacena dentro del request los errores detectados en los parametros enviados o en los segmentos de la url.
// Validaciones personalizadas con 'custom': custom es un callback que recibe la funcion que creamos. Custom recibe el parametro a revisar y lo envia a nuestra funcion creada. Lo mismo que hacer esto: .custom( (rol) => esRoleValido(rol) ) 

router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener almenos 6 caracteres').isLength({min: 6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom( emailExiste ),
  //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom( esRoleValido ), 
  validarCampos //Revisa lo errores de los checks
], usuariosPost); //si no hay errores ejecutamos el controlador

router.put("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('rol').custom( esRoleValido ), 
  validarCampos
], usuariosPut); 

router.patch("/", usuariosPatch);

router.delete("/:id",[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosDelete);

module.exports = router;
