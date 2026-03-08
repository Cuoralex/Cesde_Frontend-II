let tableroPed = document.querySelector("#tabla-pedidos");

document.addEventListener("DOMContentLoaded", () => {
    if (tableroPed) {
        getPedidos();
    }
});

async function getPedidos() {
    try {
        let url = "http://localhost:3000/api/pedidos";
        let respuesta = await fetch(url);
        let datos = await respuesta.json();

        tableroPed.innerHTML = "";
        datos.forEach((ped) => {
            let fila = document.createElement("tr");
            
            // Badge de color según estado
            let color = ped.estado === 'pendiente' ? 'warning' : 'success';

            fila.innerHTML = `
                <td>${ped.id_pedido}</td>
                <td>ID Cliente: ${ped.id_cliente}</td>
                <td>$${ped.total}</td>
                <td><span class="badge badge-${color}">${ped.estado}</span></td>
                <td>${new Date(ped.fecha).toLocaleDateString()}</td>
                <td>
                    <select class="form-control-sm" onchange="cambiarEstado(${ped.id_pedido}, this.value)">
                        <option value="">Estado...</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="procesando">Procesando</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </td>`;
            tableroPed.appendChild(fila);
        });
    } catch (error) {
        console.error("Error en pedidos:", error);
    }
}

// Implementación de cambio de estado (PATCH)
async function cambiarEstado(id, nuevoEstado) {
    if (!nuevoEstado) return;
    await fetch(`http://localhost:3000/api/pedidos/${id}/estado`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    getPedidos();
}