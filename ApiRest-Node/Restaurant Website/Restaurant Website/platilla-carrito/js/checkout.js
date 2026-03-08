document.addEventListener('DOMContentLoaded', () => {
    // Solo ejecutar si existe el formulario de checkout en la página [cite: 418, 419]
    const form = document.getElementById('form-checkout');
    if (form) {
        cargarCarritoEnCheckout();
        form.addEventListener('submit', procesarPedido);
    }
});

function cargarCarritoEnCheckout() {
    const carrito = obtenerCarrito();
    const detalle = document.getElementById('detalle-productos-checkout'); // [cite: 422]
    const labelTotal = document.getElementById('total-checkout'); // [cite: 422]
    
    if (!detalle || !labelTotal) return; // Validación anti-error

    let subtotal = 0;
    detalle.innerHTML = ''; // [cite: 424]

    carrito.forEach(p => {
        subtotal += (p.precio * p.cantidad); // [cite: 426]
        // Corregido según PDF página 11 [cite: 427, 428]
        detalle.innerHTML += `<p class="mb-1">${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}</p>`;
    });

    const totalFinal = subtotal + (subtotal * 0.05); // +5% contra-entrega [cite: 430]
    labelTotal.innerText = `$${totalFinal.toFixed(2)}`; // [cite: 430]
}

async function procesarPedido(e) {
    e.preventDefault(); // [cite: 432]
    const carrito = obtenerCarrito(); // [cite: 433]
    const total = document.getElementById('total-checkout').innerText.replace('$', ''); // [cite: 434]

    const pedido = {
        id_cliente: 1, // Simulado según PDF [cite: 437]
        metodo_pago: document.querySelector('[name="metodo-pago"]:checked').value, // [cite: 438]
        estado: 'pendiente',
        total: parseFloat(total), // [cite: 439]
        notas: document.getElementById('notas-checkout').value, // [cite: 440]
        productos: carrito // [cite: 441]
    };

    try {
        const res = await fetch('http://localhost:3000/api/pedidos', { // [cite: 444]
            method: 'POST', // [cite: 445]
            headers: { 'Content-Type': 'application/json' }, // [cite: 446]
            body: JSON.stringify(pedido) // [cite: 447]
        });

        if (res.ok) {
            const data = await res.json(); // [cite: 449]
            localStorage.setItem('numeroPedido', data.id_pedido || '001'); // [cite: 450]
            limpiarCarrito(); // [cite: 451]
            window.location.href = 'thankyou.html'; // [cite: 452]
        }
    } catch (error) {
        alert('Error al conectar con el servidor'); // [cite: 454]
    }
}