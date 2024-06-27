const randomBtn = document.getElementById("randomBtn");
const pokeCard = document.getElementById("pokeCard");
let contenido = "";

function numeroRandom(min, max) {
    const minimo = Math.ceil(min);
    const maximo = Math.floor(max);
    return Math.floor(Math.random() * (maximo - minimo) + minimo);
  }
  
const llamarApi = () => {
    for (let index = 1; index <= 6; index++) {
      
      num = numeroRandom(1, 1030);
      fetch("https://pokeapi.co/api/v2/pokemon/" + num)
          .then(res => res.json())
          .then(data => crearHtml(data)
              )
          .catch(e => console.error(new Error(e)));
    
      
    }
    
  }

  function crearHtml(pokemon) {
    contenido+=`
     <h4 class="titulo">${pokemon.name}</h4>
      <img class="pokemon" src="${pokemon.sprites.front_default}">
    `;
    pokeCard.innerHTML = contenido;

  }

  
  
  
  randomBtn.addEventListener("click", llamarApi)