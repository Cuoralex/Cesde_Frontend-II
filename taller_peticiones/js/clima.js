const API_KEY = "175a8de57657bbcb8f19b75230c4be61";

const boton = document.querySelector("#btn-clima");
const inputCiudad = document.querySelector("#ciudad");
const resultado = document.querySelector("#info-clima");

boton.addEventListener("click", async () => {

    const ciudad = inputCiudad.value.trim();
    if(!ciudad){
        alert("Por favor escribe una ciudad");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

    try {

        const res = await fetch(url);
        const data = await res.json();

        if(res.status !== 200){
            resultado.innerHTML = `<p>Error: ${data.message}</p>`;
            return;
        }

        resultado.innerHTML = `
        <div>
            <h2>${data.name}</h2>
            <h1>${Math.round(data.main.temp)}°C</h1>
            <p>${data.weather[0].description}</p>
        </div>
        `;

    } catch (error){
        resultado.innerHTML = "Error de conexión";
    }

});