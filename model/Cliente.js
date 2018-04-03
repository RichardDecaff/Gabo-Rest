var pool = require("../config/connectionPool.js");

class Cliente {

  constructor(cliente_id, nombre, telefono, estado, fecha_creado, usuario_id){
    this.cliente_id = cliente_id;
    this.nombre = this.nombre;
    this.telefono = telefono;
    this.estado = estado;
    this.fecha_creado=fecha_creado;
    this.usuario_id = usuario_id;
  }

  static getClientePorId(id, callback){
      var cliente_query = "select * from tabla_cliente where cliente_id = "+pool.escape(parseInt(id));
      pool.query(cliente_query, function(err, result, fields) {
        if (err) throw(err);
        callback(null, result[0])
      });
  }

  static getClientes(callback){
    var cliente_query = "select * from tabla_cliente";
    pool.query(cliente_query, function(err, result, fields) {
      if (err) throw(err);
      callback(null, result)
    });
}

  static getClientesPorUsuarioId(id, callback){
    var cliente_query = "select * from tabla_cliente where usuario_id = "+pool.escape(parseInt(id));
    pool.query(cliente_query, function(err, result, fields) {
      if (err) throw(err);
      callback(null, result)
    });
}

  static crearCliente(cliente, callback){
      pool.query('INSERT INTO tabla_cliente SET ?', cliente, function(error, result) {
        if (error) throw(error);
        callback(null,{"cliente_id" : result.insertId});
      });
  }


}
module.exports = Cliente;
