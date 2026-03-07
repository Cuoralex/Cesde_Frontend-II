// detectar si viene id en la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

//====================================
// CARGAR PRODUCTO PARA EDITAR
//====================================
if (idProducto) {
    cargarProducto(idProducto);
}

async function cargarProducto(id) {

    try {

        let url = `http://localhost:3000/api/productos/${id}`;

        let respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el producto");
        }

        let producto = await respuesta.json();

        document.querySelector("#productos-select").value = producto.nombre;
        document.querySelector("#precio-pro").value = producto.precio;
        document.querySelector("#form6Example6").value = producto.stock;
        document.querySelector("#form6Example7").value = producto.descripcion;

        // Si es input
        const imagenInput = document.querySelector("#imagen-pro");
        if (imagenInput.tagName === "INPUT") {
            imagenInput.value = producto.imagen;
        } else {
            imagenInput.src = producto.imagen;
        }

    } catch (error) {

        console.log("Error:", error);

    }

}

//====================================
// CREAR O ACTUALIZAR PRODUCTO
//====================================
async function createProduct() {

    try {

        let nombre = document.querySelector("#productos-select").value;
        let precio = document.querySelector("#precio-pro").value;
        let stock = document.querySelector("#form6Example6").value;
        let descripcion = document.querySelector("#form6Example7").value;

        const imagenInput = document.querySelector("#imagen-pro");
        let imagen = imagenInput.tagName === "INPUT"
            ? imagenInput.value
            : imagenInput.src;

        // Validación mínima
        if (!nombre || !precio || !stock) {
            alert("Debe completar los campos obligatorios");
            return;
        }

        let producto = {
            nombre,
            descripcion,
            precio,
            stock,
            imagen
        };

        let url = "http://localhost:3000/api/productos";
        let metodo = "POST";

        // si existe id → actualizar
        if (idProducto) {
            url = `http://localhost:3000/api/productos/${idProducto}`;
            metodo = "PUT";
        }

        let respuesta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        if (!respuesta.ok) {
            throw new Error("Error al guardar el producto");
        }

        if (idProducto) {
            alert("Producto actualizado correctamente ✏️");
        } else {
            alert("Producto creado correctamente ✅");
        }

        window.location.href = "listado-pro.html";

    } catch (error) {

        console.log("Error:", error);
        alert("Ocurrió un error al guardar el producto");

    }

}