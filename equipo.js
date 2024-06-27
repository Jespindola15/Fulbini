const randomBtn = document.getElementById("randomBtn");

function numeroRandom(min, max) {
    const minimo = Math.ceil(min);
    const maximo = Math.floor(max);
    return Math.floor(Math.random() * (maximo - minimo) + minimo);
  }
  
  const llamarApi = () => {
    num = numeroRandom(1, 1030);
    fetch("https://pokeapi.co/api/v2/pokemon/" + num)
        .then(res => res.json())
        .then(data => console.log(data)
            )
        .catch(e => console.error(new Error(e)));
  
    
  }
  
  
  randomBtn.addEventListener("click", llamarApi)