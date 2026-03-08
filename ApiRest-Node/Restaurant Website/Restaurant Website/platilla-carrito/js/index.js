document.addEventListener('DOMContentLoaded', () => {
    ... tu código anterior de botones de productos ...

    ACTIVACIÓN DEL BOTÓN DE NAVEGACIÓN 
    const botonCarritoNav = document.querySelector('.carrito'); 
    
    if (botonCarritoNav) {
        botonCarritoNav.style.cursor = "pointer"; Cambia el cursor para indicar que es clickeable
        botonCarritoNav.addEventListener('click', () => {
            Ajustamos la ruta según tu estructura de carpetas actual
            window.location.href = 'cart.html'; 
        });
    }
});

function agregarAlCarrito(idProducto) {
    const card = document.querySelector(`[data-id="${idProducto}"]`);
    const productoNuevo = {
        id: card.dataset.id,
        nombre: card.dataset.name,
        precio: parseFloat(card.dataset.price),
        imagen: card.dataset.image,
        cantidad: 1
    };

    let carrito = obtenerCarrito();
    const existe = carrito.find(item => item.id === productoNuevo.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(productoNuevo);
    }

    guardarCarrito(carrito);
    alert(`¡${productoNuevo.nombre} añadido! 🍔`);
}

  Lógica para activar la navegación al carrito [cite: 98, 102]
  const divCarrito = document.querySelector('.carrito');
  if (divCarrito) {
    divCarrito.style.cursor = "pointer"; Indica que es clickeable
    divCarrito.addEventListener('click', () => {
      window.location.href = 'cart.html'; Redirige a la página del carrito
    });
  }