var express = require('express');
var app = express();
var UsuarioController = require('./controller/UsuarioController');
var AgendaController = require('./controller/AgendaController');
var ClienteController = require('./controller/Clientecontroller')
var AutentificacionController = require('./controller/AutentificacionController.js');
var Vistas = require('./controller/VistasController.js');
app.use('/api/Usuarios', UsuarioController);
app.use('/api/Agendas', AgendaController);
app.use('/api/Clientes', ClienteController)
app.use('/auth', AutentificacionController);
app.use('/', Vistas);

module.exports = app;
