var jwt = require('jsonwebtoken');
var secreto = "SecretoTemporal";
var Usuario = require('../model/Usuario.js');

function verificarToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No se recibio un token.' });
  jwt.verify(token, secreto, function(error, deCodificado) {
    if (error)
    return res.status(500).send({ auth: false, message: 'No se pudo autenticar el token.' });
    req.usuario_id = deCodificado.usuario_id;
    next();
  });
}
module.exports = verificarToken;
