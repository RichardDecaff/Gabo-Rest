var VerificarToken = require('VerificarToken.js');

function autorizarToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No se recibio un token.' });
  jwt.verify(token, config.secret, function(error, deCodificado) {
    if (error)
    return res.status(500).send({ auth: false, message: 'No se pudo autenticar el token.' });

    Usuario.getUsuarioPorId(deCodificado.usuario_id, function(error, usuario){
      if(error) return res.status(500).send("Hubo un problema identificando al usuario.");
      if (!usuario) return res.status(404).send("No se encontro el usuario.");
      req.nivel = usuario.nivel;
      req.usuario_id = usuario.usuario_id;
    });
    next();
  });
}

function autorizar();

router.get('/me', VerificarToken, function(req, res) {
    Usuario.getUsuarioPorId(req.usuario_id, function(error, usuario){
      if(error) return res.status(500).send("Hubo un problema identificando al usuario.");
      if (!usuario) return res.status(404).send("No se encontro el usuario.");
      res.status(200).send({usuario_id: usuario.usuario_id, nivel: usuario.nivel});
    });
  });
module.exports = autorizarToken;
