const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({ //Error 500 error en el servidor
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      //Error 401 no autorizado
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

const tieneRole = ( ...roles ) => { //... Operador rest crea un array con todos los parametros recibidos.
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({ //Error 500 error en el servidor
              msg: "Se quiere verificar el role sin validar el token primero",
            });
          }

        if(!roles.includes( req.usuario.rol)){ //Si el rol del usuario autenticado no esta dentro de los roles especificados
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
  esAdminRole,
  tieneRole
};
