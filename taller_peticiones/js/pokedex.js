async function buscarPokemon() {
    const nombre = document.getElementById("poke-nombre").value.toLowerCase();
    const contenedor = document.getElementById("poke-card");
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // Extraer habilidades [cite: 36]
        const habilidades = data.abilities.map(h => h.ability.name).join(", ");

        contenedor.innerHTML = `
            <div class="card text-center border-0">
                <img src="${data.sprites.front_default}" class="mx-auto" style="width: 150px">
                <div class="card-body">
                    <h4 class="text-uppercase">${data.name}</h4>
                    <p><strong>Habilidades:</strong> ${habilidades}</p>
                    <p><strong>Poderes base (HP):</strong> ${data.stats[0].base_stat}</p>
                </div>
            </div>`;
    } catch (e) {
        contenedor.innerHTML = "<p class='text-center text-danger'>Pokémon no encontrado</p>";
    }
}