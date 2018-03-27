var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Usuario = require('../model/Usuario.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secreto = "SecretoTemporal";
var VerificarToken = require('./VerificarToken.js');

router.post('/registrarse', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.login, 8);
  Usuario.crearUsuario({
    usuario_id: null,
    correo: req.body.correo,
    login: hashedPassword,
    nivel: 1
  },
  function (err, usuario) {
    if (err) return res.status(500).send("Ocurrio un problema al registrar al usuario.")
    var token = jwt.sign({ usuario_id: usuario.usuario_id }, secreto, {
      expiresIn: 86400 // 24 horas
    });
    res.status(200).send({ auth: true, token: token });
  });
});

router.post('/login', function(req, res) {
  Usuario.getUsuarioPorCorreo(req.body.correo, function (error, usuario) {
    if (error) return res.status(500).send('Error en el servidor.');
    if (!usuario) return res.status(404).send('No se encontro el usuario.');
    var loginValido = bcrypt.compareSync(req.body.login, usuario.login);
    if (!loginValido) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ usuario_id: usuario.usuario_id }, secreto, {
      expiresIn: 86400 // 24 horas
    });
    res.status(200).send({ auth: true, token: token });
  });
  });

  router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('/me', VerificarToken, function(req, res) {
    Usuario.getUsuarioPorId(req.usuario_id, function(error, usuario){
      if(error) return res.status(500).send("Hubo un problema identificando al usuario.");
      if (!usuario) return res.status(404).send("No se encontro el usuario.");
      res.status(200).send({usuario_id: usuario.usuario_id, nivel: usuario.nivel});
    });
  });
module.exports = router;
