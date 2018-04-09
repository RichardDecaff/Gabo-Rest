$("#login").on('click', loginAuth);
$("#signup").on('click', signupAuth);
//TODO unbind event hasta tener respuesta para no hacer multiples requests
$loginForm = $('#loginForm');

function toggleSignup() {
  $loginForm.find("div.uk-alert").remove();
  $loginForm.toggleClass('uk-hidden');
  $('#signupForm').toggleClass('uk-hidden');
}

function signupAuth() {
//TODO validar correo y contraseña NO HACER USUARIOS EN BLANCO
  var data = $('#signupForm').serialize();
  $.ajax({
    type: "POST",
    url: "./auth/registrarse",
    data: data,
    complete: function(r){
      console.log(r.responseText);
    },
    success: function(){
      toggleSignup()
      var alert = $("<div class=\"uk-alert uk-alert-success\">Perfecto! Hora de probar tu nueva cuenta</div>")
      $loginForm.append(alert);
    },
    dataType: "html",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  });
}

function loginAuth() {
  $loginForm.find("div.uk-alert").remove();
  //TODO validar correo y contraseña
  var data = $loginForm.serialize();
  $.ajax({
    type: "POST",
    url: "./auth/login",
    data: data,
    success: function (data, textStatus, r) {
      console.log(r.status);
      var tokenResponse = JSON.parse(r.responseText);
      //console.log(tokenResponse.token);
      localStorage.setItem('r28Token', tokenResponse.token);
      $.ajaxSetup({
        headers: {"x-access-token": localStorage.getItem('r28Token')}
      });
      window.validarToken();
    },
    error: function (r) {
      var alert = $("<div class=\"uk-alert uk-alert-warning\">Alguno de los datos es incorrecto</div>")
      $loginForm.append(alert);
    },
    dataType: "html",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  });
}
