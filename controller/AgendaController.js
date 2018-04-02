var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Agenda = require('../model/Agenda.js');
var VerificarToken = require('./VerificarToken.js');


router.get('/:id', function (req, res) {
    Agenda.getAgendaPorId(req.params.id, function (err, agenda) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!agenda) return res.status(404).send("La agenda no fue encontrada.");
        res.status(200).send(agenda);
    });
});

router.get('/', function (req, res) {
    Agenda.getAgendas(function (err, agenda) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!agenda) return res.status(404).send("No se encontraron agendas.");
        res.status(200).send(agenda);
    });
});

router.get('/usuario/:id', function (req, res) {
    Agenda.getAgendas(req.params.id, function (err, agenda) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!agenda) return res.status(404).send("No se encontraron agendas para el usuario.");
        res.status(200).send(agenda);
    });
});

router.post('/', VerificarToken, function (req, res) {
    var age = new Agenda(null, 1, req.usuario_id, req.body.titulo, req.body.notas, req.body.fecha_creada, req.body.ubicacion, 1, req.body.cliente_id, "Pendiente");
    Agenda.crearAgenda(agenda, function (err, agenda) {
        if (err) return res.status(500).send("Problema con la coneccion.");
        if (!agenda) return res.status(404).send("La agenda no fue encontrada.");
        res.status(200).send(agenda);
    });
});


module.exports = router;
