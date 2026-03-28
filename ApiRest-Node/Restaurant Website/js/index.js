document.addEventListener('DOMContentLoaded', () => {
    // Navegación al carrito
    const botonCarritoNav = document.querySelector('.carrito'); 
    if (botonCarritoNav) {
        botonCarritoNav.style.cursor = "pointer"; 
        botonCarritoNav.addEventListener('click', () => {
            window.location.href = 'cart.html'; 
        });
    }

    // Configuración de botones de compra
    const productos = document.querySelectorAll('.card.producto');
    productos.forEach(producto => {
        const boton = producto.querySelector('.btn-product') || producto.querySelector('.fa-basket-shopping');
        if (boton) {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                agregarAlCarrito(producto.dataset.id);
            });
        }
    });
});

function agregarAlCarrito(idProducto) {
    const card = document.querySelector(`[data-id="${idProducto}"]`);
    const productoNuevo = {
        // Se usa id_producto para consistencia con el Backend
        id_producto: card.dataset.id, 
        nombre: card.dataset.name,
        precio: parseFloat(card.dataset.price),
        imagen: card.dataset.image,
        cantidad: 1
    };

    let carrito = obtenerCarrito();
    const existe = carrito.find(item => item.id_producto === productoNuevo.id_producto);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(productoNuevo);
    }

    guardarCarrito(carrito);
    alert(`¡${productoNuevo.nombre} añadido! 🍔`);
}