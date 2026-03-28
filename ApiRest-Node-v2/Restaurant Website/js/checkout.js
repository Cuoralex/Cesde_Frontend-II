document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoEnCheckout();
    const form = document.getElementById('form-checkout');
    if (form) form.addEventListener('submit', procesarPedido);
});

function cargarCarritoEnCheckout() {
    const carrito = obtenerCarrito();
    const detalle = document.getElementById('detalle-productos-checkout');
    const labelTotal = document.getElementById('total-checkout');
    if (!detalle || !labelTotal) return;

    let subtotal = 0;
    detalle.innerHTML = '';

    carrito.forEach(p => {
        const totalFila = p.precio * p.cantidad;
        subtotal += totalFila;
        detalle.innerHTML += `<p class="mb-1">${p.nombre} x${p.cantidad} - $${totalFila.toFixed(2)}</p>`; 
    });

    const totalFinal = subtotal + (subtotal * 0.05); // Recargo contra-entrega
    labelTotal.innerText = `$${totalFinal.toFixed(2)}`;
}

async function procesarPedido(e) {
    e.preventDefault();
    const carrito = obtenerCarrito();
    const totalStr = document.getElementById('total-checkout').innerText;
    const totalNum = parseFloat(totalStr.replace(/[^\d.]/g, ''));

    const pedido = {
        id_cliente: 1,
        metodo_pago: document.querySelector('[name="metodo-pago"]:checked').value,
        estado: 'pendiente',
        total: totalNum,
        notas: document.getElementById('notas-checkout').value || "",
        productos: carrito.map(p => ({
            id_producto: p.id_producto,
            precio: p.precio,
            cantidad: p.cantidad
        }))
    };

    try {
        const response = await fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            const resData = await response.json();
            localStorage.setItem('numeroPedido', resData.id_pedido || resData.id);
            limpiarCarrito();
            window.location.href = 'thankyou.html';
        } else {
            alert("Error 500: El Backend rechazó los datos. Revisa que los IDs existan en MySQL.");
        }
    } catch (err) {
        alert("Error de conexión con el servidor.");
    }
}