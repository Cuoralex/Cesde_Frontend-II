// Configuración base [cite: 2]
const API_URL = 'http://localhost:3000/api';

// Obtener carrito del localStorage [cite: 3, 4]
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guardar carrito en localStorage [cite: 5, 6]
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorVisual(); // [cite: 7]
}

// Actualizar el número en el icono del carrito [cite: 8, 11]
function actualizarContadorVisual() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0); // [cite: 10]
    const contador = document.querySelector('.contar-pro');
    if (contador) contador.innerText = totalItems; // [cite: 12]
}

function limpiarCarrito() {
    localStorage.removeItem('carrito'); // [cite: 14]
}

// Inicializar contador al cargar cualquier página [cite: 16]
document.addEventListener('DOMContentLoaded', actualizarContadorVisual);