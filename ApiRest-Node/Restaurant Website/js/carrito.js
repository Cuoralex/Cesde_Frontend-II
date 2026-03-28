const API_URL = 'http://localhost:3000/api';

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorVisual();
}

function actualizarContadorVisual() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.querySelector('.contar-pro');
    if (contador) contador.innerText = totalItems;
}

function limpiarCarrito() {
    localStorage.removeItem('carrito');
}

document.addEventListener('DOMContentLoaded', actualizarContadorVisual);