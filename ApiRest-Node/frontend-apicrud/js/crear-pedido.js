let carritoPedido = [];
let listaProductos = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
    cargarProductos();
    
    // Listeners para actualización de totales
    document.querySelector("#descuento").addEventListener("input", calcularTotalFinal);
    document.querySelector("#aumento").addEventListener("input", calcularTotalFinal);
    
    // Enviar Formulario
    document.querySelector("#formulario-pedido").addEventListener("submit", guardarPedido);
});

// 1. Cargar Clientes para el Select
async function cargarClientes() {
    const res = await fetch("http://localhost:3000/api/clientes");
    const clientes = await res.json();
    const select = document.querySelector("#id_cliente");
    clientes.forEach(c => {
        select.innerHTML += `<option value="${c.id_cliente}">${c.nombre} ${c.apellido}</option>`;
    });
}

// 2. Cargar Productos para poder agregarlos
async function cargarProductos() {
    const res = await fetch("http://localhost:3000/api/productos");
    listaProductos = await res.json();
    
    // Agregamos un buscador simple o select para elegir productos
    const divProductos = document.createElement("div");
    divProductos.className = "mb-3";
    divProductos.innerHTML = `
        <label>Agregar Producto al Pedido:</label>
        <select id="select-producto-add" class="form-control mb-2">
            <option value="">Elegir producto...</option>
            ${listaProductos.map(p => `<option value="${p.id}">${p.nombre} ($${p.precio})</option>`).join('')}
        </select>
        <button type="button" class="btn btn-success btn-sm" onclick="agregarAlCarritoLocal()">+ Agregar Producto</button>
    `;
    document.querySelector("#formulario-pedido").prepend(divProductos);
}

// 3. Lógica del Carrito Interno
function agregarAlCarritoLocal() {
    const idProd = document.querySelector("#select-producto-add").value;
    if (!idProd) return;

    const producto = listaProductos.find(p => p.id == idProd);
    const itemExistente = carritoPedido.find(item => item.id_producto == idProd);

    if (itemExistente) {
        itemExistente.cantidad++;
        itemExistente.subtotal = itemExistente.cantidad * itemExistente.precio;
    } else {
        carritoPedido.push({
            id_producto: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            subtotal: producto.precio
        });
    }
    renderizarCarrito();
}

function renderizarCarrito() {
    const tbody = document.querySelector("#cuerpo-carrito");
    tbody.innerHTML = "";
    carritoPedido.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>$${item.subtotal}</td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button></td>
            </tr>`;
    });
    calcularTotalFinal();
}

function eliminarDelCarrito(index) {
    carritoPedido.splice(index, 1);
    renderizarCarrito();
}

// 4. Calcular Total Automático
function calcularTotalFinal() {
    const subtotalProds = carritoPedido.reduce((acc, item) => acc + item.subtotal, 0);
    const descuento = parseFloat(document.querySelector("#descuento").value) || 0;
    const aumento = parseFloat(document.querySelector("#aumento").value) || 0;
    
    const total = subtotalProds - descuento + aumento;
    document.querySelector("#total-pedido").innerText = `$${total.toFixed(2)}`;
}

// 5. Guardar Pedido (POST)
async function guardarPedido(e) {
    e.preventDefault();
    
    if (carritoPedido.length === 0) return alert("Agregue al menos un producto");

    const totalStr = document.querySelector("#total-pedido").innerText.replace('$', '');
    
    const pedidoFinal = {
        id_cliente: document.querySelector("#id_cliente").value,
        metodo_pago: document.querySelector("#metodo_pago").value,
        estado: "pendiente",
        total: parseFloat(totalStr),
        productos: carritoPedido.map(p => ({
            id_producto: p.id_producto,
            cantidad: p.cantidad,
            subtotal: p.subtotal
        }))
    };

    try {
        const res = await fetch("http://localhost:3000/api/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedidoFinal)
        });

        if (res.ok) {
            alert("Pedido creado con éxito ✅");
            window.location.href = "listado-pedidos.html";
        }
    } catch (error) {
        console.error("Error al guardar pedido:", error);
    }
}