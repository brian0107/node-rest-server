const { Router } = require("express"); //Extraemos la funcion Router

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/userController");

const router = Router();

router.get("/", usuariosGet);

router.post("/", usuariosPost);

router.put("/:id", usuariosPut); // definimos un parametro obligatorio en la Url 'id'

router.patch("/", usuariosPatch);

router.delete("/", usuariosDelete);

module.exports = router;
