const input = document.getElementById("ingresar-tarea");
const boton = document.getElementById("crear-tarea");
const lista = document.getElementById("lista-de-tareas");

// =========================
// AGREGAR TAREA
// =========================
function agregarTarea() {

    const texto = input.value.trim();

    if (texto === "") return;

    // Crear contenedor principal
    const tarea = document.createElement("div");
    tarea.classList.add("tarea");

    // Crear texto
    const parrafo = document.createElement("p");
    parrafo.innerText = texto;

    // Crear contenedor de iconos
    const iconos = document.createElement("div");
    iconos.classList.add("iconos");

    // Icono completar
    const completar = document.createElement("i");
    completar.classList.add("bi", "bi-check-circle-fill");
    completar.addEventListener("click", completarTarea);

    // Icono editar
    const editar = document.createElement("i");
    editar.classList.add("bi", "bi-pencil-fill");
    editar.addEventListener("click", editarTarea);

    // Icono eliminar
    const eliminar = document.createElement("i");
    eliminar.classList.add("bi", "bi-trash3-fill");
    eliminar.addEventListener("click", eliminarTarea);

    // Construcción
    iconos.appendChild(completar);
    iconos.appendChild(editar);
    iconos.appendChild(eliminar);

    tarea.appendChild(parrafo);
    tarea.appendChild(iconos);

    lista.appendChild(tarea);

    input.value = "";
}

// =========================
// ELIMINAR TAREA
// =========================
function eliminarTarea(e) {
    const tarea = e.target.parentNode.parentNode;
    tarea.remove();
}

// =========================
// COMPLETAR TAREA
// =========================
function completarTarea(e) {
    const tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle("completada");
}

// =========================
// EDITAR TAREA (reto adicional)
// =========================
function editarTarea(e) {

    const tarea = e.target.parentNode.parentNode;
    const parrafo = tarea.querySelector("p");

    const textoActual = parrafo.innerText;

    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.value = textoActual;

    tarea.replaceChild(nuevoInput, parrafo);

    nuevoInput.focus();

    nuevoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const nuevoTexto = nuevoInput.value.trim();
            if (nuevoTexto !== "") {
                parrafo.innerText = nuevoTexto;
            }
            tarea.replaceChild(parrafo, nuevoInput);
        }
    });
}

// =========================
// EVENTOS
// =========================
boton.addEventListener("click", agregarTarea);

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        agregarTarea();
    }
});
