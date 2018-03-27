var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Usuario = require('../model/Usuario.js');


router.get('/:id', function (req, res) {
    Usuario.getUsuarioPorId(req.params.id, function (err, usuario) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!usuario) return res.status(404).send("El usuario no fue encontrado.");
        res.status(200).send(usuario);
    });
});


module.exports = router;
