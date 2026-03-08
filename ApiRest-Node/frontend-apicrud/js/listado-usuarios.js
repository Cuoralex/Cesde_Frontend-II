let listaUsuarios = [];
const tableroUser = document.querySelector("#tabla-usuarios");

Lógica de Autenticación Integrada
let usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

if (!usuarioLogueado) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    Mostrar nombre en el Topbar si el elemento existe
    const nameLabel = document.getElementById("nombreUsuario");
    if (nameLabel) {
        nameLabel.innerText = usuarioLogueado.usuario || usuarioLogueado.nombre;
    }

    if (tableroUser) {
        getUsers();
    }
});

OBTENER USUARIOS (READ)
async function getUsers() {
    try {
        const url = "http://localhost:3000/api/usuarios";
        const respuesta = await fetch(url);
        
        if (respuesta.ok) {
            const datos = await respuesta.json();
            listaUsuarios = datos;
            tableroUser.innerHTML = "";

            datos.forEach((user) => {
                const fila = document.createElement("tr");

                Solo administradores pueden eliminar
                let btnEliminar = "";
                if (usuarioLogueado.rol === "administrador") {
                    btnEliminar = `
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>`;
                }

                fila.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.usuario}</td>
                    <td><span class="badge badge-info">${user.rol}</span></td>
                    <td>${user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${btnEliminar}
                    </td>
                `;
                tableroUser.appendChild(fila);
            });
        }
    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
}

ELIMINAR USUARIO (DELETE)
async function eliminarUsuario(id) {
    if (!confirm("¿Desea eliminar este usuario?")) return;

    try {
        const url = `http://localhost:3000/api/usuarios/${id}`;
        const respuesta = await fetch(url, { method: "DELETE" });

        if (respuesta.ok) {
            alert("Usuario eliminado ❌");
            getUsers();
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

BUSCADOR
function buscarUsuario() {
    const texto = document.querySelector('input[type="search"]').value.toLowerCase();
    const filtrados = listaUsuarios.filter(u => 
        u.usuario.toLowerCase().includes(texto) || 
        u.rol.toLowerCase().includes(texto)
    );

    tableroUser.innerHTML = "";
    filtrados.forEach((user) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${user.id}</td>
            <td>${user.usuario}</td>
            <td><span class="badge badge-info">${user.rol}</span></td>
            <td>${user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tableroUser.appendChild(fila);
    });
}

function editUser(id) {
    window.location.href = `crear-usuario.html?id=${id}`;
}

function logout(){
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}