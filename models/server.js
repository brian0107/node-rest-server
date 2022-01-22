const express = require("express"); //Express es para crear nuestro servidor
const cors = require("cors"); //Cors permite la transferencia de datos entre un servidor y otro
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    // Moddlewares : funciones que siempre se ejecutan cuando levantamos el servidor
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors()); //Permite peticiones desde cualquier dominio

    // Lectura y parseo del body
    this.app.use( express.json() ); //Obtiene la informacion de los request method Post,Put,Delete en formato Json.
   
    //Directorio público
    this.app.use(express.static("public")); //'use' es la palabra clave para decir que esto es un middleware. express.static() es una funcion que sirve archivos estaticos en la ruta ('/').
  }

  routes() {
    this.app.use(this.usuariosPath, require("../router/userRouter"));
  }

  listen() {
    //Puerto donde montaremos el servidor
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
