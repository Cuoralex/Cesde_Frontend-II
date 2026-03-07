let listaProductos = [];

let tableroPro = document.querySelector("table tbody");

// detectar cuando cargue la pagina
document.addEventListener("DOMContentLoaded", () => {

    console.log("Carga completa 👌");

    if (tableroPro) {
        getProducts();
    }

});

//====================================
// OBTENER USUARIO LOGUEADO
//====================================
function obtenerUsuario(){

    let usuario = localStorage.getItem("usuario");

    if(!usuario){
        return null;
    }

    return JSON.parse(usuario);
}

//====================================
// OBTENER PRODUCTOS (READ)
//====================================
async function getProducts(){

    try{

        let url = "http://localhost:3000/api/productos";

        let respuesta = await fetch(url,{
            method: "GET",
            headers:{
                "content-type":"application/json"
            }
        });

        tableroPro.innerHTML = "";

        if(respuesta.status == 204){

            console.log("No hay datos en la BD");

        }else{

            let datos = await respuesta.json();

            console.log("productos", datos);

            if(!Array.isArray(datos)){
                console.error("La API no devolvió un array:", datos);
                return;
            }

            listaProductos = datos;

            const usuario = obtenerUsuario();

            datos.forEach((pro)=>{

                let fila = document.createElement("tr");

                // restringir botón eliminar si es vendedor
                let botonEliminar = "";

                if(!usuario || usuario.rol !== "vendedor"){
                    botonEliminar = `
                    <button class="btn btn-danger" onclick="eliminarProducto(${pro.id})">
                        X
                    </button>
                    `;
                }

                fila.innerHTML = `
                <td>${pro.id}</td>
                <td>${pro.nombre}</td>
                <td>${pro.descripcion}</td>
                <td>${pro.precio}</td>
                <td>${pro.stock}</td>
                <td><img src="${pro.imagen}" width="80px"></td>
                <td>
                    <button class="btn btn-warning" onclick="editProduct(${pro.id})">✏️</button>
                    ${botonEliminar}
                </td>
                `;

                tableroPro.appendChild(fila);

            });

        }

    }catch(error){

        console.log("Error:", error);

    }

}

//====================================
// CREAR PRODUCTO (CREATE)
//====================================
async function createProduct(){

    if(!document.querySelector("#nombre")) return;

    let nombre = document.querySelector("#nombre").value;
    let descripcion = document.querySelector("#descripcion").value;
    let precio = document.querySelector("#precio").value;
    let stock = document.querySelector("#stock").value;
    let imagen = document.querySelector("#imagen").value;

    let url = "http://localhost:3000/api/productos";

    let nuevoProducto = {
        nombre,
        descripcion,
        precio,
        stock,
        imagen
    };

    try{

        let respuesta = await fetch(url,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        if(respuesta.ok){
            alert("Producto creado correctamente ✅");
            window.location.href = "listado-pro.html";
        }

    }catch(error){

        console.log("Error:", error);

    }

}

//====================================
// EDITAR PRODUCTO
//====================================
async function editProduct(id){

    try{

        let url = `http://localhost:3000/api/productos/${id}`;

        let respuesta = await fetch(url);

        let producto = await respuesta.json();

        if(document.querySelector("#nombre")){

            document.querySelector("#nombre").value = producto.nombre;
            document.querySelector("#descripcion").value = producto.descripcion;
            document.querySelector("#precio").value = producto.precio;
            document.querySelector("#stock").value = producto.stock;
            document.querySelector("#imagen").value = producto.imagen;

            document.querySelector("#btnGuardar")
            .setAttribute("onclick",`updateProduct(${id})`);

        }else{

            window.location.href = `crear-pro.html?id=${id}`;

        }

    }catch(error){

        console.log(error);

    }

}

//====================================
// ACTUALIZAR PRODUCTO (UPDATE)
//====================================
async function updateProduct(id){

    let nombre = document.querySelector("#nombre").value;
    let descripcion = document.querySelector("#descripcion").value;
    let precio = document.querySelector("#precio").value;
    let stock = document.querySelector("#stock").value;
    let imagen = document.querySelector("#imagen").value;

    let url = `http://localhost:3000/api/productos/${id}`;

    let productoActualizado = {
        nombre,
        descripcion,
        precio,
        stock,
        imagen
    };

    try{

        let respuesta = await fetch(url,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(productoActualizado)
        });

        if(respuesta.ok){

            alert("Producto actualizado correctamente ✏️");

            window.location.href = "listado-pro.html";

        }

    }catch(error){

        console.log(error);

    }

}

//====================================
// ELIMINAR PRODUCTO (DELETE)
//====================================
async function eliminarProducto(id){

    const usuario = obtenerUsuario();

    // bloquear si es vendedor
    if(usuario && usuario.rol === "vendedor"){
        alert("El vendedor no tiene permisos para eliminar productos");
        console.warn("Intento de eliminación bloqueado");
        return;
    }

    const confirmar = confirm("¿Desea eliminar el producto?");

    if(!confirmar) return;

    try{

        let url = `http://localhost:3000/api/productos/${id}`;

        let respuesta = await fetch(url,{
            method:"DELETE"
        });

        if(respuesta.ok){

            alert("Producto eliminado ❌");

            getProducts();

        }

    }catch(error){

        console.log("Error:", error);

    }

}

//====================================
// BUSCADOR
//====================================
function buscarProducto(){

    let texto = document
    .querySelector("#buscar-producto")
    .value
    .toLowerCase();

    let filtrados = listaProductos.filter(producto =>

        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto)

    );

    tableroPro.innerHTML = "";

    filtrados.forEach((pro)=>{

        let fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${pro.id}</td>
        <td>${pro.nombre}</td>
        <td>${pro.descripcion}</td>
        <td>${pro.precio}</td>
        <td>${pro.stock}</td>
        <td><img src="${pro.imagen}" width="80px"></td>
        <td>
            <button class="btn btn-warning" onclick="editProduct(${pro.id})">✏️</button>
        </td>
        `;

        tableroPro.appendChild(fila);

    });

}