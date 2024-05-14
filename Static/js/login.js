let btnSend = document.querySelector('#btn-send');
const regex = /@.*\.[a-zA-Z]+$/;

btnSend.addEventListener('click', function() {
  let email = document.querySelector('#email').value.trim();
  let contrasena = document.querySelector('#contrasena').value.trim();
  let errorEmail = document.querySelector('#error-email');
  let errorContrasena = document.querySelector('#error-contrasena');

  if (!regex.test(email)) {
    errorEmail.innerHTML = 'Debes ingresar un email';
    if (contrasena === '') {
      errorContrasena.innerHTML = 'Debes completar el campo Contraseña';
    } else {
      errorContrasena.innerHTML = '';
    }
    return;
  } else {
    errorEmail.innerHTML = '';
  }

  if (contrasena === '') {
    errorContrasena.innerHTML = 'Debes completar el campo Contraseña';
    return;
  } else {
    errorContrasena.innerHTML = '';
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (!Array.isArray(usuarios)) {
    usuarios = [usuarios];
  }

  let usuarioEncontrado = false;
  let nombre;

  usuarios.forEach(usuario => {
    if (usuario.email === email && usuario.contrasena === contrasena) {
      usuarioEncontrado = true;
      nombre = usuario.nombre;
    }
  });

  if (usuarioEncontrado) {
    alert('Bienvenido ' + nombre + '!');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});
