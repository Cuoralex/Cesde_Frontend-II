// variables globales
let boton = document.querySelector(".btn-consultar");
let resultado = document.querySelector(".resultado");

// evento al boton
boton.addEventListener("click", peticion);

// Funcion modernizada con Async/Await
async function peticion() {
    let url = "http://localhost/apiPeliculas/datos.txt";
    
    // Limpiar el contenedor antes de una nueva consulta
    resultado.innerHTML = ""; 

    try {
        let respuesta = await fetch(url, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        // Validar si la respuesta del servidor es correcta (status 200)
        if (!respuesta.ok) throw new Error("No se pudo conectar con el servidor");

        let peliculas = await respuesta.json();

        // Renderizado de datos
        peliculas.forEach((peli) => {
            resultado.innerHTML += `
                <div class="card m-2" style="width: 18rem;">
                    <img src="${peli.imagen}" class="card-img-top" alt="${peli.titulo}" style="height: 250px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${peli.titulo}</h5>
                        <p class="card-text">
                            <strong>Año:</strong> ${peli.lanzamiento} <br>
                            <strong>Género:</strong> ${peli.genero}
                        </p>
                        <a href="#" class="btn btn-primary w-100">Ver detalles</a>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error en la petición:", error);
        resultado.innerHTML = `<div class="alert alert-danger">Error al cargar películas: ${error.message}</div>`;
    }
}