const express = require("express"); //Express es para crear nuestro servidor
const cors = require("cors"); //Cors permite la transferencia de datos entre un servidor y otro

const { dbConnection } = require('../database/config');
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    // Conectar a base de datos
    this.conectarDB();

    // Moddlewares : funciones que siempre se ejecutan cuando levantamos el servidor
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

    async conectarDB() {
      await dbConnection();
    }

  middlewares() { //Middleware de nivel de aplicación
    // CORS
    this.app.use(cors()); //Permite peticiones desde cualquier dominio

    // Lectura y parseo del body
    this.app.use( express.json() ); //Obtiene la informacion entrante de los request method Post,Put en formato Json.
   
    //Directorio público
    this.app.use(express.static("public")); //'use' es la palabra clave para decir que esto es un middleware. express.static() es una funcion que sirve archivos estaticos en la ruta ('/').
  }

  routes() { //La ruta de usuarios tiene asociado un router que escucha el metodo de solicitud, valida y llama un controlador
    this.app.use(this.authPath, require("../router/authRouter"));
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
