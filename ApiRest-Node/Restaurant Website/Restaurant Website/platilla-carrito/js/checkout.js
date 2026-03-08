document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-checkout');
    if (form) {
        cargarCarritoEnCheckout();
        form.addEventListener('submit', procesarPedido);
    }
});

function cargarCarritoEnCheckout() {
    const carrito = obtenerCarrito();
    const detalle = document.getElementById('detalle-productos-checkout');
    const labelTotal = document.getElementById('total-checkout');
    
    if (!detalle || !labelTotal) return;

    let subtotal = 0;
    detalle.innerHTML = '';

    carrito.forEach(p => {
        subtotal += (p.precio * p.cantidad);
        detalle.innerHTML += `<p class="mb-1">${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}</p>`;
    });

    const totalFinal = subtotal + (subtotal * 0.05);
    labelTotal.innerText = `$${totalFinal.toFixed(2)}`;
}

async function procesarPedido(e) {
    e.preventDefault();
    
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return alert("Tu carrito está vacío.");

    const totalTexto = document.getElementById('total-checkout').innerText;
    const totalNumerico = parseFloat(totalTexto.replace('$', '').replace(',', ''));

    
    const pedido = {
        id_cliente: 1,
        metodo_pago: document.querySelector('[name="metodo-pago"]:checked').value,
        estado: 'pendiente',
        total: totalNumerico,
        notas: document.getElementById('notas-checkout').value || "Sin notas adicionales",
        productos: carrito.map(p => ({
            id_producto: parseInt(p.id),
            cantidad: parseInt(p.cantidad),
            precio: parseFloat(p.precio)
        }))
    };

    try {
        const res = await fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('numeroPedido', data.id_pedido || data.id); 
            limpiarCarrito();
            window.location.href = 'thankyou.html';
        } else {
            const errorServer = await res.json();
            alert("Error en el servidor (500): " + (errorServer.mensaje || "Revisa la consola del backend"));
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert('No se pudo conectar con el servidor. Asegúrate de que el Backend esté corriendo.');
    }
}