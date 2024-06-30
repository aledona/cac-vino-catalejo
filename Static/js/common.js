document.addEventListener("DOMContentLoaded", (event) => {
  updateNavBar();
});

function updateNavBar() {
  const user = JSON.parse(localStorage.getItem("usuario"));

  const navLinks = document.getElementById("navLinks");
  if (user) {
    navLinks.innerHTML = `
            <li>
                <a href="./index.html">Inicio</a>
            </li>
            <li>
                <a href="./nuestros-vinos.html">Nuestros vinos</a>
            </li>
            <li>
                <a href="./varietales.html">Varietales</a>
            </li>
            <li>
                <a href="./contacto.html">Contacto</a>
            </li>
            <li>
                <a href="./delete.html">Dar de baja</a>
            </li>
            <li>
                <span>Hola ${user.firstname}!</span>
                <a href="#" onclick="logout()" title="Desloguear" class="btnLogout">
                    <i class="fa-solid fa-sign-out-alt"></i>
                </a>
            </li>
        `;
  } else {
    navLinks.innerHTML = `
            <li>
                <a href="./index.html">Inicio</a>
            </li>
            <li>
                <a href="./nuestros-vinos.html">Nuestros vinos</a>
            </li>
            <li>
                <a href="./varietales.html">Varietales</a>
            </li>
            <li>
                <a href="./contacto.html">Contacto</a>
            </li>
            <li>
                <a href="./register.html">Registrarse</a>
            </li>
            <li>
                <a href="./login.html">Iniciar sesión &nbsp; <i class="fa-solid fa-user"></i></a>
            </li>
        `;
  }
}

function logout() {
  localStorage.removeItem("usuario");
  updateNavBar();
}
