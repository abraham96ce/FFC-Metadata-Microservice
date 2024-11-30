
var express = require('express');// Importa el módulo 'express', un framework para construir aplicaciones web en Node.js.
var cors = require('cors');// Importa el módulo 'cors' para habilitar Cross-Origin Resource Sharing, lo que permite solicitudes desde otros dominios.
require('dotenv').config()// Carga las variables de entorno desde un archivo '.env' utilizando el módulo 'dotenv'.
const multer = require('multer');// Importa el módulo 'multer', que se usa para manejar la carga de archivos en solicitudes HTTP.
const upload = multer()// Crea una instancia del middleware 'multer' que manejará la carga de archivos.

// Crea una instancia de la aplicación 'express'.
var app = express();

// Habilita el uso de CORS en la aplicación para permitir solicitudes desde diferentes dominios.
app.use(cors());

// Sirve archivos estáticos desde el directorio 'public'. Se pueden acceder a través de la ruta '/public'.
app.use('/public', express.static(process.cwd() + '/public'));

// Configura la ruta para la solicitud GET a la raíz ('/'). Envía el archivo 'index.html' como respuesta.
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html'); // Responde con el archivo 'index.html' que se encuentra en la carpeta 'views'.
});

// Configura la ruta para la solicitud POST a '/api/fileanalyse'. Se utiliza el middleware 'upload.single' para manejar la carga de un solo archivo.
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  // Una vez cargado el archivo, responde con un JSON que contiene el nombre, tipo MIME y tamaño del archivo.
  res.json({
    name: req.file.originalname,  // Nombre original del archivo.
    type: req.file.mimetype,      // Tipo MIME del archivo.
    size: req.file.size           // Tamaño del archivo en bytes.
  })
})

// Establece el puerto en el que la aplicación escuchará. Si la variable de entorno 'PORT' está definida, se usa, de lo contrario, usa el puerto 3000.
const port = process.env.PORT || 3000;

// Inicia el servidor en el puerto especificado y muestra un mensaje en la consola cuando el servidor esté funcionando.
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
