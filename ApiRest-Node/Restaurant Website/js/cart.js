document.addEventListener('DOMContentLoaded', cargarCarrito);

function cargarCarrito() {
    const carrito = obtenerCarrito();
    const tabla = document.getElementById('carrito-items');
    if (!tabla) return;

    tabla.innerHTML = '';
    let subtotalGeneral = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        subtotalGeneral += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <button class="btn btn-sm btn-danger me-2" onclick="eliminarDelCarrito('${item.id_producto}')">✕</button>
                <img src="${item.imagen}" width="50" alt="">
                <span>${item.nombre}</span>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" 
                       class="form-control w-50" 
                       onchange="actualizarCantidad('${item.id_producto}', this.value)">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        tabla.appendChild(fila);
    });

    const domicilio = subtotalGeneral > 0 ? 5.00 : 0;
    const descuento = subtotalGeneral > 50 ? 5.00 : 0;
    const total = subtotalGeneral + domicilio - descuento;

    document.getElementById('subtotal-resumen').innerText = `$${subtotalGeneral.toFixed(2)}`;
    document.getElementById('domicilio-resumen').innerText = `$${domicilio.toFixed(2)}`;
    document.getElementById('descuento-resumen').innerText = `-$${descuento.toFixed(2)}`;
    document.getElementById('total-resumen').innerText = `$${total.toFixed(2)}`;
}

function actualizarCantidad(id, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const item = carrito.find(p => p.id_producto === id);
    if (item) {
        item.cantidad = parseInt(nuevaCantidad);
        guardarCarrito(carrito);
        cargarCarrito();
    }
}

function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.id_producto !== id);
    guardarCarrito(carrito);
    cargarCarrito();
}