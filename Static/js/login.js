const BASEURL = "http://127.0.0.1:5000";
let btnSend = document.querySelector("#btn-send");
const regex = /@.*\.[a-zA-Z]+$/;

async function fetchData(url, method, data = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options); // Realiza la petición fetch
    if (!response.ok) {
      alert("Usuario no encontrado.");
      return;
    }
    return await response.json(); // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching data. Please try again.");
  }
}

async function enviar() {
  let email = document.querySelector("#email").value.trim();
  let contrasena = document.querySelector("#contrasena").value.trim();
  let errorEmail = document.querySelector("#error-email");
  let errorContrasena = document.querySelector("#error-contrasena");

  if (!regex.test(email)) {
    errorEmail.innerHTML = "Debes ingresar un email";
    if (contrasena === "") {
      errorContrasena.innerHTML = "Debes completar el campo Contraseña";
    } else {
      errorContrasena.innerHTML = "";
    }
    return;
  } else {
    errorEmail.innerHTML = "";
  }

  if (contrasena === "") {
    errorContrasena.innerHTML = "Debes completar el campo Contraseña";
    return;
  } else {
    errorContrasena.innerHTML = "";
  }

  // let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // if (!Array.isArray(usuarios)) {
  //   usuarios = [usuarios];
  // }

  // let usuarioEncontrado = false;
  // let nombre;

  // usuarios.forEach((usuario) => {
  //   if (usuario.email === email && usuario.contrasena === contrasena) {
  //     usuarioEncontrado = true;
  //     nombre = usuario.nombre;
  //   }
  // });
  const userData = {
    email: email,
    password: contrasena,
  };

  user = await fetchData(BASEURL + "/api/users/login", "POST", userData);

  if (user != undefined) {
    alert("Bienvenido " + user.firstname + "!");
    result = await fetchData(`${BASEURL}/api/users/${user.id}`, "PUT");

    localStorage.setItem("usuario", JSON.stringify(user));
    window.location.href = "index.html";
  }

  //   if (usuarioEncontrado) {
  //     alert("Bienvenido " + nombre + "!");
  //   } else {
  //     alert("Usuario o contraseña incorrectos");
  //   }
}

btnSend.addEventListener("click", function () {
  enviar();
});
