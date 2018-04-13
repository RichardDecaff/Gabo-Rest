$("#loginForm").submit(loginAuth);
$("#signupForm").submit(signupAuth);
$loginForm = $('#loginForm');

function toggleSignup() {
  $loginForm.find("div.uk-alert").remove();
  $loginForm.toggleClass('uk-hidden');
  $('#signupForm').toggleClass('uk-hidden');
}

function signupAuth(e) {
//TODO validar correo y contraseña NO HACER USUARIOS EN BLANCO
  var $button = $(e.target);
  $button.hide();
  var data = $('#signupForm').serialize();
  $.ajax({
    type: "POST",
    url: "./auth/registrarse",
    data: data,
    complete: function(r){
      var $button = $(e.target);
      $button.show();
    },
    success: function(){
      toggleSignup()
      var alert = $("<div class=\"uk-alert uk-alert-success\">Perfecto! Hora de probar tu nueva cuenta</div>")
      $loginForm.append(alert);
    },
    dataType: "html",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  });
  return false;
}

function loginAuth(e) {
  e.preventDefault();
  var $button = $(e.target);
  var $waitMsg = $("<div class= \"uk-alert uk-alert-info\">Un momento...</div>");
  $loginForm.find("div.uk-alert").remove();
  $button.hide();
  $button.parent().append($waitMsg);
  //TODO validar correo y contraseña
  var data = $loginForm.serialize();
  $.ajax({
    type: "POST",
    url: "./auth/login",
    data: data,
    success: function (data, textStatus, r) {
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
    complete: function () {
      $button.show();
      $waitMsg.remove();
    },
    dataType: "html",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  });
  return false;
}
