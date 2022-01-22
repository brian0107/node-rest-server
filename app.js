require('dotenv').config(); //dotenv es para configurar variables de entorno

const Server = require('./models/server'); 

const server = new Server(); 

server.listen();


