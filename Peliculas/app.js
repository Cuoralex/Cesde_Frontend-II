// ===============================
// VARIABLES GLOBALES
// ===============================
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {
  admin: "admin123",
  usuario: "1234",
  demo: "demo"
};

let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;
let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
let peliculaEditando = null;


// ===============================
// INICIALIZACIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  inicializarEventos();
  verificarSesion();
  renderizarPeliculas();
});


// ===============================
// EVENTOS
// ===============================
function inicializarEventos() {

  document.getElementById("formLogin")
    .addEventListener("submit", login);

  document.getElementById("formRegistro")
    .addEventListener("submit", registrar);

  document.getElementById("btnLogout")
    .addEventListener("click", logout);

  document.getElementById("btnGuardarPelicula")
    .addEventListener("click", guardarPelicula);

  document.getElementById("inputBuscar")
    .addEventListener("input", aplicarFiltros);

  document.getElementById("selectGenero")
    .addEventListener("change", aplicarFiltros);
}


// ===============================
// AUTENTICACIÓN
// ===============================
function login(e) {
  e.preventDefault();

  const user = document.getElementById("inputUser").value;
  const pass = document.getElementById("inputPassword").value;

  if (usuarios[user] && usuarios[user] === pass) {
    usuarioActual = user;
    localStorage.setItem("usuarioActual", JSON.stringify(user));
    mostrarApp();
    e.target.reset();
  } else {
    alert("Credenciales incorrectas");
  }
}

function registrar(e) {
  e.preventDefault();

  const user = document.getElementById("inputUserReg").value;
  const pass = document.getElementById("inputPasswordReg").value;
  const confirm = document.getElementById("inputConfirmPassword").value;

  if (pass !== confirm) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (usuarios[user]) {
    alert("El usuario ya existe");
    return;
  }

  usuarios[user] = pass;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuario registrado correctamente");
  e.target.reset();
}

function logout() {
  localStorage.removeItem("usuarioActual");
  usuarioActual = null;
  mostrarLogin();
}

function verificarSesion() {
  if (usuarioActual) {
    mostrarApp();
  } else {
    mostrarLogin();
  }
}

function mostrarApp() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
  document.getElementById("btnLogin").style.display = "none";
  document.getElementById("btnLogout").style.display = "block";
  document.getElementById("btnAgregar").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("loginSection").style.display = "flex";
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("btnLogin").style.display = "block";
  document.getElementById("btnLogout").style.display = "none";
  document.getElementById("btnAgregar").style.display = "none";
}


// ===============================
// CRUD PELÍCULAS
// ===============================
function guardarPelicula() {

  const nueva = {
    id: peliculaEditando || Date.now(),
    titulo: inputTitulo.value,
    genero: inputGenero.value,
    director: inputDirector.value,
    ano: inputAno.value,
    calificacion: inputCalificacion.value,
    descripcion: inputDescripcion.value,
    imagen: inputImagen.value
  };

  if (peliculaEditando) {
    peliculas = peliculas.map(p =>
      p.id === peliculaEditando ? nueva : p
    );
    peliculaEditando = null;
  } else {
    peliculas.unshift(nueva);
  }

  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  document.getElementById("formPelicula").reset();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalPelicula")
  );
  if (modal) modal.hide();

  renderizarPeliculas();
}


function eliminarPelicula(id) {
  if (!confirm("¿Eliminar película?")) return;

  peliculas = peliculas.filter(p => p.id !== id);
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  renderizarPeliculas();
}


// ✅ IMPLEMENTACIÓN NECESARIA: EDITAR
function editarPelicula(id) {
  const peli = peliculas.find(p => p.id === id);
  if (!peli) return;

  inputTitulo.value = peli.titulo;
  inputGenero.value = peli.genero;
  inputDirector.value = peli.director;
  inputAno.value = peli.ano;
  inputCalificacion.value = peli.calificacion;
  inputDescripcion.value = peli.descripcion;
  inputImagen.value = peli.imagen;

  peliculaEditando = id;

  new bootstrap.Modal(
    document.getElementById("modalPelicula")
  ).show();
}


function verDetalles(id) {
  const peli = peliculas.find(p => p.id === id);
  if (!peli) return;

  detallesTitulo.textContent = peli.titulo;
  detallesGenero.textContent = peli.genero;
  detallesDirector.textContent = peli.director;
  detallesAno.textContent = peli.ano;
  detallesCalificacion.textContent = peli.calificacion;
  detallesDescripcion.textContent = peli.descripcion;
  detallesImagen.src = peli.imagen;

  new bootstrap.Modal(
    document.getElementById("modalDetalles")
  ).show();
}


// ===============================
// RENDER
// ===============================
function renderizarPeliculas(lista = peliculas) {

  const grid = document.getElementById("gridPeliculas");
  const slider = document.getElementById("carouselMovies");
  const sinResultados = document.getElementById("sinResultados");

  grid.innerHTML = "";
  slider.innerHTML = "";

  if (lista.length === 0) {
    grid.style.display = "none";
    sinResultados.style.display = "block";
    return;
  }

  grid.style.display = "flex";
  sinResultados.style.display = "none";

  lista.forEach(p => {

    grid.innerHTML += `
      <div class="col-md-4">
        <div class="movie-card">
          <img src="${p.imagen}" class="movie-image">
          <div class="movie-content">
            <h5>${p.titulo}</h5>
            <span class="movie-genre">${p.genero}</span>
            <p class="movie-rating">⭐ ${p.calificacion}</p>
            <div class="movie-actions">
              <button class="btn btn-info btn-sm" onclick="verDetalles(${p.id})">Detalles</button>
              <button class="btn btn-warning btn-sm" onclick="editarPelicula(${p.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarPelicula(${p.id})">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    slider.innerHTML += `
      <div class="slider-movie-card" onclick="verDetalles(${p.id})">
        <img src="${p.imagen}">
        <div class="slider-movie-info">
          <h6>${p.titulo}</h6>
        </div>
      </div>
    `;
  });
}


// ===============================
// BÚSQUEDA + FILTRO
// ===============================
function aplicarFiltros() {

  const texto = inputBuscar.value.toLowerCase();
  const genero = selectGenero.value;

  const filtradas = peliculas.filter(p => {
    const coincideTexto =
      p.titulo.toLowerCase().includes(texto);

    const coincideGenero =
      genero === "" || p.genero === genero;

    return coincideTexto && coincideGenero;
  });

  renderizarPeliculas(filtradas);
}


// ===============================
// SLIDER
// ===============================
function scrollSlider(dir) {
  const slider = document.getElementById("carouselMovies");
  slider.scrollLeft += dir * 300;
}
