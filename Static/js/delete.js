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

  const userData = {
    email: email,
    password: contrasena,
  };

  user = await fetchData(BASEURL + "/api/users/login", "POST", userData);

  if (user != undefined) {
    const confirmDelete = confirm(
      `¿Estás seguro de que deseas eliminar el usuario ${user.firstname}?`
    );
    if (confirmDelete) {
      result = await fetchData(`${BASEURL}/api/users/${user.id}`, "DELETE");
      alert("Se eliminó el usuario de  " + user.firstname + "!");
      logout();
      window.location.href = "index.html";
    } else {
      alert("Eliminación cancelada.");
    }
  }
}

btnSend.addEventListener("click", function () {
  enviar();
});
