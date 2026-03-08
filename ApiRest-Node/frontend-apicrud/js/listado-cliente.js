// Variable para búsqueda
let listaClientes = [];
// Aseguramos que busque el ID exacto de tu HTML
const tableroCli = document.querySelector("#tabla-clientes");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Carga completa de clientes 👌");
    if (tableroCli) {
        getClientes();
    }
});

//====================================
// OBTENER CLIENTES (READ)
//====================================
async function getClientes() {
    try {
        const url = "http://localhost:3000/api/clientes";
        const respuesta = await fetch(url);
        
        if (respuesta.status === 204) {
            console.log("No hay datos en la BD");
            tableroCli.innerHTML = '<tr><td colspan="7" class="text-center">No hay clientes registrados</td></tr>';
            return;
        }

        const datos = await respuesta.json();
        console.log("Clientes encontrados:", datos);
        listaClientes = datos;
        renderizarTabla(listaClientes);

    } catch (error) {
        console.error("Error al cargar la tabla:", error);
    }
}

// Función auxiliar para pintar la tabla
function renderizarTabla(datos) {
    tableroCli.innerHTML = "";
    
    // Obtener usuario para permisos
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    datos.forEach((cli) => {
        const fila = document.createElement("tr");

        // Bloquear botón eliminar si es vendedor
        let btnEliminar = "";
        if (!usuario || usuario.rol !== "vendedor") {
            btnEliminar = `
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cli.id_cliente})">
                    <i class="fas fa-trash"></i>
                </button>`;
        }

        fila.innerHTML = `
            <td>${cli.id_cliente}</td>
            <td>${cli.nombre}</td>
            <td>${cli.apellido}</td>
            <td>${cli.email}</td>
            <td>${cli.celular}</td>
            <td>${cli.direccion || 'Sin dirección'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCliente(${cli.id_cliente})">
                    <i class="fas fa-edit"></i>
                </button>
                ${btnEliminar}
            </td>
        `;
        tableroCli.appendChild(fila);
    });
}

//====================================
// ELIMINAR CLIENTE
//====================================
async function eliminarCliente(id) {
    if (!confirm("¿Seguro que desea eliminar este cliente?")) return;
    try {
        const respuesta = await fetch(`http://localhost:3000/api/clientes/${id}`, { 
            method: "DELETE" 
        });
        
        if(respuesta.ok) {
            alert("Cliente eliminado correctamente ❌");
            getClientes(); 
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

//====================================
// BUSCADOR (FILTRADO)
//====================================
function buscarCliente(texto) {
    const filtrados = listaClientes.filter(cli => 
        cli.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        cli.apellido.toLowerCase().includes(texto.toLowerCase()) ||
        cli.email.toLowerCase().includes(texto.toLowerCase())
    );
    renderizarTabla(filtrados);
}

function editCliente(id) {
    window.location.href = `crear-cliente.html?id=${id}`;
}