document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formulario-cliente");
    const btnSubmit = formulario.querySelector('button[type="submit"]');
    const tituloPagina = document.querySelector("h1");

    Detectar si estamos editando (si existe ?id=X en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    if (clienteId) {
        tituloPagina.innerText = "Editar Cliente";
        btnSubmit.innerText = "Actualizar Cliente";
        cargarDatosCliente(clienteId);
    }

    Evento para Guardar (Crear o Editar)
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        Recolectar datos usando tus IDs de HTML
        const clienteData = {
            nombre: document.querySelector("#nombre-cli").value,
            apellido: document.querySelector("#apellido-cli").value,
            email: document.querySelector("#email-cli").value,
            celular: document.querySelector("#celular-cli").value,
            direccion: document.querySelector("#direccion-cli").value,
            descripcion: document.querySelector("#descripcion-cli").value
        };

        try {
            let url = "http://localhost:3000/api/clientes";
            let metodo = "POST"; Por defecto crear

            if (clienteId) {
                url = `http://localhost:3000/api/clientes/${clienteId}`;
                metodo = "PUT"; Si hay ID, actualizar
            }

            const respuesta = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteData)
            });

            if (respuesta.ok) {
                alert(clienteId ? "Cliente actualizado ✏️" : "Cliente creado ✅");
                window.location.href = "listado-clientes.html";
            } else {
                alert("Error al procesar la solicitud ❌");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });

    Función para llenar el formulario si es edición
    async function cargarDatosCliente(id) {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/clientes/${id}`);
            if (respuesta.ok) {
                const cli = await respuesta.json();
                
                Mapear datos a los inputs (asumiendo que vienen del backend con esos nombres)
                document.querySelector("#nombre-cli").value = cli.nombre;
                document.querySelector("#apellido-cli").value = cli.apellido;
                document.querySelector("#email-cli").value = cli.email;
                document.querySelector("#celular-cli").value = cli.celular;
                document.querySelector("#direccion-cli").value = cli.direccion;
                document.querySelector("#descripcion-cli").value = cli.descripcion || "";
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    }
});