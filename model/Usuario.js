var pool = require("../config/connectionPool.js");

class Usuario {

  constructor(usuario_id, correo, login, nivel){
    this.usuario_id = usuario_id;
    this.correo = correo;
    this.login = login;
    this.nivel = nivel;
  }

  static getUsuarioPorId(id, callback){
      var user_query = "select * from tabla_usuario where usuario_id = "+pool.escape(parseInt(id));
      pool.query(user_query, function(err, result, fields) {
        if (err) throw(err);
        callback(null, result[0])
      });
  }

  static getUsuarioPorCorreo(correo, callback){
      var user_query = "select * from tabla_usuario where correo = "+pool.escape(correo)+"";
      pool.query(user_query, function(err, result, fields) {
        if (err) throw(err);
        callback(null, result[0])
      });
  }

  static crearUsuario(usuario, callback){
      pool.query('INSERT INTO tabla_usuario SET ?', usuario, function(error, result) {
        if (error) throw(error);
        callback(null,{"usuario_id" : result.insertId});
      });
  }


}
module.exports = Usuario;
