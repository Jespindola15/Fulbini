const itemdex = document.getElementById("itemdex");
const botonesHeader = document.querySelectorAll(".btn-header");

for (let i = 1; i <= 50; i++) {
    fetch("https://pokeapi.co/api/v2/item/" +i)
        .then((response) => response.json())
        .then(data =>mostrarItem(data))
}

function mostrarItem(item) {

    let itemId = item.id.toString();
    if (itemId.length === 1) {
        itemId = "00" + itemId;
    } else if (itemId.length === 2) {
        itemId = "0" + itemId;
    }


    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
        <div class="card">
            <p class="item-id-back">#${itemId}</p>
            <div class="item-imagen">
                <img src="${item.sprites.default}" height= "100px" width= "100px"  alt="${item.name}">
            </div>
            <div class="item-info">
                <div class="nombre-contenedor">
                    <p class="item-id">#${itemId}</p>
                    <h2 class="item-nombre">${item.name}</h2>
                </div>
                <div class="item-categoria">
                    ${item.category.name}
                </div>
            </div>
        </div>
    `;
    itemdex.append(div);
}


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonId = event.currentTarget.id;

  itemdex.innerHTML = "";

  for (let i = 1; i <= 50; i++) {
      fetch("https://pokeapi.co/api/v2/item/" + i)
          .then((response) => response.json())
          .then(data => {

              if(botonId === "ver-todos") {
                  mostrarItem(data);
              } else {
                  const tipo = data.category.name;
                  if (tipo == botonId) {
                      mostrarItem(data);
                  }
              }

          })
  }
}))