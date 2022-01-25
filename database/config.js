// Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono.
const mongoose = require("mongoose");

const dbConnection = async () => {
  //Funcion para conectar a la base de datos en la nube
  try {
    await mongoose.connect(process.env.MONGODB_CNN, { // Recibe nuestra ruta de conexion y 2 parametros requeridos
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Si se conecta exitosamente
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos"); //Detiene la ejecucion de la apliacion
  }
};

module.exports = {
  dbConnection
};
