document.addEventListener('DOMContentLoaded', cargarCarrito); // [cite: 18]

function cargarCarrito() {
    const carrito = obtenerCarrito(); // [cite: 20]
    const tabla = document.getElementById('carrito-items'); // [cite: 21]
    if (!tabla) return;

    tabla.innerHTML = ''; // [cite: 23]
    let subtotalGeneral = 0; // [cite: 24]

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad; // [cite: 26]
        subtotalGeneral += subtotal; // [cite: 27]

        const fila = document.createElement('tr'); // [cite: 28]
        fila.innerHTML = `
            <td>
                <button class="btn btn-sm btn-danger me-2" onclick="eliminarDelCarrito('${item.id}')">✕</button>
                <img src="${item.imagen}" width="50" alt="">
                <span>${item.nombre}</span>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" 
                       class="form-control w-50" 
                       onchange="actualizarCantidad('${item.id}', this.value)">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
        `; // [cite: 31, 33, 34, 36, 38, 41, 42]
        tabla.appendChild(fila); // [cite: 43]
    });

    // Cálculos de totales [cite: 44, 45, 46]
    const domicilio = subtotalGeneral > 0 ? 5.00 : 0;
    const descuento = subtotalGeneral > 50 ? 5.00 : 0;
    const total = subtotalGeneral + domicilio - descuento;

    document.getElementById('subtotal-resumen').innerText = `$${subtotalGeneral.toFixed(2)}`; // [cite: 47, 48]
    document.getElementById('domicilio-resumen').innerText = `$${domicilio.toFixed(2)}`; // [cite: 49, 51]
    document.getElementById('descuento-resumen').innerText = `-$${descuento.toFixed(2)}`; // [cite: 50, 51]
    document.getElementById('total-resumen').innerText = `$${total.toFixed(2)}`; // [cite: 52]
}

function actualizarCantidad(id, nuevaCantidad) {
    let carrito = obtenerCarrito(); // [cite: 54]
    const item = carrito.find(p => p.id === id); // [cite: 55]
    if (item) {
        item.cantidad = parseInt(nuevaCantidad); // [cite: 56]
        guardarCarrito(carrito);
        cargarCarrito(); // [cite: 57]
    }
}

function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito(); // [cite: 59]
    carrito = carrito.filter(p => p.id !== id); // [cite: 60]
    guardarCarrito(carrito); // [cite: 61]
    cargarCarrito(); // [cite: 62]
}