var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Cliente = require('../model/Cliente.js');
var VerificarToken = require('./VerificarToken.js');


router.get('/:id', function (req, res) {
    Cliente.getClientePorId(req.params.id, function (err, cliente) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!cliente) return res.status(404).send("El cliente no fue encontrado.");
        res.status(200).send(cliente);
    });
});

router.get('/', function (req, res) {
    Cliente.getClientes(function (err, cliente) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!cliente) return res.status(404).send("No se encontraron clientes.");
        res.status(200).send(cliente);
    });
});

router.get('/usuario/:id', function (req, res) {
    Cliente.getClientesPorUsuarioId(req.params.id, function (err, cliente) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!cliente) return res.status(404).send("No se encontraron clientes para el usuario.");
        res.status(200).send(cliente);
    });
});

router.post('/', VerificarToken, function (req, res) {
    var clien = new Cliente(null, req.body.nombre, req.body.telefono, req.body.estado, req.body.fecha_creado, req.usuario_id);
    Cliente.crearCliente(clien, function (err, cliente) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!cliente) return res.status(404).send("El cliente no fue creado.");
        res.status(200).send(cliente);
    });
});


module.exports = router;
