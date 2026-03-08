let listaProductos = [];
// El selector debe ser exacto al de tu HTML
let tableroPro = document.querySelector("table tbody");

document.addEventListener("DOMContentLoaded", () => {
    if (tableroPro) {
        getProducts();
    }
});

function obtenerUsuario(){
    let usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
}

async function getProducts(){
    try {
        let url = "http://localhost:3000/api/productos";
        let respuesta = await fetch(url);
        
        if(respuesta.ok){
            let datos = await respuesta.json();
            listaProductos = datos;
            tableroPro.innerHTML = "";

            const usuario = obtenerUsuario();

            datos.forEach((pro) => {
                let fila = document.createElement("tr");

                // Restricción por rol de vendedor
                let botonEliminar = "";
                if(!usuario || usuario.rol !== "vendedor"){
                    botonEliminar = `
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${pro.id})">
                        X
                    </button>`;
                }

                // Usamos pro.id porque así lo muestra tu base de datos
                fila.innerHTML = `
                <td>${pro.id}</td>
                <td>${pro.nombre}</td>
                <td>${pro.descripcion}</td>
                <td>${pro.precio}</td>
                <td>${pro.stock}</td>
                <td><img src="${pro.imagen}" width="80px"></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${pro.id})">✏️</button>
                    ${botonEliminar}
                </td>`;
                
                tableroPro.appendChild(fila);
            });
        }
    } catch(error) {
        console.error("Error cargando productos:", error);
    }
}

async function eliminarProducto(id){
    if(!confirm("¿Desea eliminar el producto?")) return;

    try {
        let url = `http://localhost:3000/api/productos/${id}`;
        let respuesta = await fetch(url, { method: "DELETE" });
        if(respuesta.ok){
            alert("Producto eliminado ❌");
            getProducts();
        }
    } catch(error) {
        console.log("Error:", error);
    }
}

function buscarProducto(){
    let texto = document.querySelector("#buscar-producto").value.toLowerCase();
    let filtrados = listaProductos.filter(p => 
        p.nombre.toLowerCase().includes(texto) || 
        p.descripcion.toLowerCase().includes(texto)
    );

    tableroPro.innerHTML = "";
    filtrados.forEach((pro) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${pro.id}</td>
        <td>${pro.nombre}</td>
        <td>${pro.descripcion}</td>
        <td>${pro.precio}</td>
        <td>${pro.stock}</td>
        <td><img src="${pro.imagen}" width="80px"></td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="editProduct(${pro.id})">✏️</button>
        </td>`;
        tableroPro.appendChild(fila);
    });
}

function editProduct(id){
    window.location.href = `crear-pro.html?id=${id}`;
}