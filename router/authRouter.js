const { Router } = require("express"); //Extraemos la funcion Router para utlizar Middleware de nivel de direccionador
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { login, googleSignIn } = require("../controllers/authController");

const router = Router();

router.post("/login",[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La constraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post("/google",[
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;