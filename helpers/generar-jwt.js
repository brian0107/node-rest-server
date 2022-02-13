const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid }; 

    jwt.sign(
      payload, // Datos a guardar en el token
      process.env.SECRETORPRIVATEKEY, // Clave secreta para firmar nuestros tokens
      {
        expiresIn: "4h", // objeto de confi, agregamos la fecha de expiración.
      },
      (err, token) => { //Callback que resuelve o rechaza la promesa
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
