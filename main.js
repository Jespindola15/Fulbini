const pokedex = document.querySelector("#pokedex");
const botonesHeader = document.querySelectorAll(".btn-header");
const buscador = document.getElementById("buscador");


for (let i = 1; i <= 493; i++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(pokemon) {

    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="card">
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" height= "100px" width= "100px"  alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${pokemon.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${pokemon.height}m</p>
                    <p class="stat">${pokemon.weight}kg</p>
                </div>
            </div>
        </div>
    `;
    pokedex.append(div);

}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokedex.innerHTML = "";

    for (let i = 1; i <= 251; i++) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))

buscador.addEventListener("keyup", e => {
    if(e.target.matches("#buscador")) {
        document.querySelectorAll(".card").forEach(poke => {
            poke.textContent.toLowerCase().includes(e.target.value)
            ? poke.classList.remove("filtro")
            : poke.classList.add("filtro")

        })
    }
})


