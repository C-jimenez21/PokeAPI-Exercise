//Url
let url = "https://pokeapi.co/api/v2/pokemon/"

//Contenedores
let container = document.querySelector(".showCards")
let btnBack = document.querySelector(".Back")
let btnNext = document.querySelector(".Next")

//acciones
btnBack.addEventListener("click", (e) => {
    e.preventDefault()
    if(offset !== 1){
        container.innerHTML =""
        offset -= 9
        rangePokemones(offset, limit)
    }
    e.stopPropagation()
})
btnNext.addEventListener("click", (e) => {
    e.preventDefault()
    container.innerHTML =""
    offset += 9
    rangePokemones(offset, limit)
    e.stopPropagation()
})


//Paginacion
let offset = 1
let limit = 8

async function getData(id){
    try {
        const promise = await fetch(url+id)
        const result = await promise.json()
        createCardPokemon(result)

    } catch (error) {
        console.log(error)
    }   
}

async function rangePokemones (offset, limit){
    for(let i = offset; i<=offset+limit; i++){
       await getData(i)
    }
}

function createCardPokemon(pokemon){
    let naturaleza = pokemon.types.map((e)=> `<p class = "${e.type.name}" >${e.type.name}</p>`)
       
    container.innerHTML+=` <div class="card">
    <div class="card-header">
    <p>#${pokemon.id}</p>
        <img src="${pokemon.sprites.other.home.front_default}" alt="">
    </div>
    <div class="card-body">
        <h3>${pokemon.name}</h3>
        <div class = "powers">
        ${naturaleza.join("")}
    </div>
        <button class="btn-Id" data-idPoke="${pokemon.id}">Mostrar mas</button>
    </div>
</div>`
}


rangePokemones(offset, limit)