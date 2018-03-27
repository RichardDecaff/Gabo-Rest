var express = require('express');
var app = express();
var UsuarioController = require('./controller/UsuarioController');
var AutentificacionController = require('./controller/AutentificacionController.js');
var Vistas = require('./controller/VistasController.js');
app.use('/Usuarios', UsuarioController);
app.use('/auth', AutentificacionController);
app.use('/', Vistas);

module.exports = app;
