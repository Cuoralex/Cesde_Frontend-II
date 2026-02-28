async function obtenerFotos() {
    // Limitamos a 12 para que se vea simétrico en Bootstrap (4x3) 
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=12"; 
    const contenedor = document.querySelector("#galeria-resultado");

    try {
        const respuesta = await fetch(url);
        const fotos = await respuesta.json();
        
        contenedor.innerHTML = ""; 
        fotos.forEach(foto => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm h-100">
                        <img src="${foto.thumbnailUrl}" 
                             class="card-img-top" 
                             alt="foto"
                             onerror="this.src='https://picsum.photos/200?random=${foto.id}'">
                        <div class="card-body">
                            <h6 class="card-title text-muted">ID: ${foto.id}</h6>
                            <p class="card-text small text-capitalize">${foto.title}</p>
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        contenedor.innerHTML = `<p class="text-danger">Error al conectar con la API de fotos.</p>`;
    }
}
// Llamada automática al cargar la página 
obtenerFotos();