var pool = require("../config/connectionPool.js");

class Agenda {

  constructor(agenda_id, usuario_id, titulo, notas, fecha_creada, ubicacion, visibilidad, cliente_id, resultado){
    this.agenda_id = agenda_id;
    this.usuario_id = usuario_id;
    this.titulo = titulo;
    this.notas = notas;
    this.fecha_creada=fecha_creada;
    this.ubicacion = ubicacion;
    this.visibilidad = visibilidad;
    this.cliente_id = cliente_id;
    this.resultado = resultado;
  }

  static getAgendaPorId(id, callback){
      var agenda_query = "select * from tabla_agenda where agenda_id = "+pool.escape(parseInt(id));
      pool.query(agenda_query, function(err, result, fields) {
        if (err) throw(err);
        callback(null, result[0])
      });
  }

  static getAgendas(callback){
    var agenda_query = "select * from tabla_agenda";
    pool.query(agenda_query, function(err, result, fields) {
      if (err) throw(err);
      callback(null, result)
    });
}

  static getAgendasPorUsuarioId(id, callback){
    var agenda_query = "select * from tabla_agenda where usuario_id = "+pool.escape(parseInt(id));
    pool.query(agenda_query, function(err, result, fields) {
      if (err) throw(err);
      callback(null, result)
    });
}

static getAgendasPorClienteId(id, callback){
    var agenda_query = "select * from tabla_agenda where cliente_id = "+pool.escape(parseInt(id));
    pool.query(agenda_query, function(err, result, fields) {
      if (err) throw(err);
      callback(null, result)
    });
}

  static crearAgenda(agenda, callback){
      pool.query('INSERT INTO tabla_agenda SET ?', agenda, function(error, result) {
        if (error) throw(error);
        callback(null,{"agenda_id" : result.insertId});
      });
  }


}
module.exports = Agenda;
