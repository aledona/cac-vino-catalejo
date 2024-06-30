const BASEURL = "http://127.0.0.1:5000";
let btnSend = document.querySelector("#btn-send");
const regex = /@.*\.[a-zA-Z]+$/;
class Usuario {
  constructor(
    firstname,
    lastname,
    genre,
    email,
    password,
    birthdate,
    country,
    lastlogin
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.genre = genre;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
    this.country = country;
    this.lastlogin = null;
  }
}
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
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json(); // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching data. Please try again.");
  }
}

async function showCountries() {
  let countries = await fetchData(BASEURL + "/api/countries/", "GET");
  const dropdown = document.querySelector("#countryDropdown");
  dropdown.innerHTML =
    '<option value="" disabled selected>Select a country</option>';

  countries.forEach((country) => {
    let option = `<option value="${country.id}">${country.name}</option>`;
    dropdown.insertAdjacentHTML("beforeend", option);
  });
}

showCountries();

btnSend.addEventListener("click", function () {
  let nombre = document.querySelector("#nombre");
  let apellido = document.querySelector("#apellido");
  let email = document.querySelector("#email");
  let contrasena = document.querySelector("#contrasena");
  let confirmContrasena = document.querySelector("#confirmContrasena");
  let fechaNacimiento = document.querySelector("#fechaNacimiento");
  let pais = document.querySelector("#countryDropdown");
  let sexoMasculino = document.querySelector("#masculino");
  let sexoFemenino = document.querySelector("#femenino");
  let terminosYCondiciones = document.querySelector("#tyc");

  let errorNombre = document.querySelector("#error-nombre");
  let errorApellido = document.querySelector("#error-apellido");
  let errorEmail = document.querySelector("#error-email");
  let errorContrasena = document.querySelector("#error-contrasena");
  let errorConfirmContrasena = document.querySelector(
    "#error-confirmContrasena"
  );
  let errorFechaNacimiento = document.querySelector("#error-fechaNacimiento");
  let errorPais = document.querySelector("#error-pais");
  let errorSexo = document.querySelector("#error-sexo");
  let errorTyc = document.querySelector("#error-tyc");

  if (nombre.value.trim() == "") {
    errorNombre.innerHTML = "Debes completar el campo Nombre";
  } else {
    let errorNombre = document.querySelector("#error-nombre");
    errorNombre.innerHTML = "";
  }

  if (apellido.value.trim() == "") {
    errorApellido.innerHTML = "Debes completar el campo Apellido";
  } else {
    errorApellido.innerHTML = "";
  }

  if (!regex.test(email.value.trim())) {
    errorEmail.innerHTML = "Debes ingresar un email";
  } else {
    errorEmail.innerHTML = "";
  }

  if (contrasena.value.trim() == "") {
    errorContrasena.innerHTML = "Debes completar el campo Contraseña";
  } else {
    errorContrasena.innerHTML = "";
  }

  if (contrasena.value.trim() != confirmContrasena.value.trim()) {
    errorConfirmContrasena.innerHTML = "La contraseña no coincide";
  } else {
    errorConfirmContrasena.innerHTML = "";
  }

  if (fechaNacimiento.value.trim() == "") {
    errorFechaNacimiento.innerHTML =
      "Debes completar el campo fecha de nacimiento";
  } else {
    let fechaNacimientoUsuario = new Date(fechaNacimiento.value);
    let mayorEdad = new Date();
    mayorEdad.setFullYear(mayorEdad.getFullYear() - 18);
    if (fechaNacimientoUsuario > mayorEdad) {
      document.querySelector("#error-fechaNacimiento").innerHTML =
        "Debes ser mayor de 18 años para registrarte";
    } else {
      document.querySelector("#error-fechaNacimiento").innerHTML = "";
    }
  }

  if (pais.value.trim() == "") {
    errorPais.innerHTML = "Debes completar el campo pais";
  } else {
    errorPais.innerHTML = "";
  }

  if (!sexoMasculino.checked && !sexoFemenino.checked) {
    errorSexo.innerHTML = "Debes seleccionar tu sexo";
  } else {
    errorSexo.innerHTML = "";
  }

  if (!terminosYCondiciones.checked) {
    errorTyc.innerHTML = "Debes aceptar los Términos y Condiciones";
  } else {
    errorTyc.innerHTML = "";
  }

  if (
    errorTyc.innerHTML === "" &&
    errorSexo.innerHTML === "" &&
    errorNombre.innerHTML === "" &&
    errorApellido.innerHTML === "" &&
    errorEmail.innerHTML === "" &&
    errorContrasena.innerHTML === "" &&
    errorConfirmContrasena.innerHTML === "" &&
    errorFechaNacimiento.innerHTML === "" &&
    errorPais.innerHTML === ""
  ) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const sexo = sexoMasculino.checked ? "Masculino" : "Femenino";

    const newUsuario = new Usuario(
      nombre.value.trim(),
      apellido.value.trim(),
      sexo,
      email.value.trim(),
      contrasena.value.trim(),
      fechaNacimiento.value.trim(),
      pais.value.trim(),
      (lastlogin = null)
    );

    if (!Array.isArray(usuarios)) {
      usuarios = [];
    }
    result = fetchData(`${BASEURL}/api/users/`, "POST", newUsuario);

    alert("¡Registro exitoso! Ya puede loguearse.");

    nombre.value = "";
    apellido.value = "";
    email.value = "";
    contrasena.value = "";
    confirmContrasena.value = "";
    fechaNacimiento.value = "";
    pais.value = "";
    sexoMasculino.checked = false;
    sexoFemenino.checked = false;
    terminosYCondiciones.checked = false;
  }
});
