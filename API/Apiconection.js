//Url
let url = "https://pokeapi.co/api/v2/pokemon/"

//Contenedores
let container = document.querySelector(".showCards")
let btnBack = document.querySelector(".Back")
let btnNext = document.querySelector(".Next")
let btnSelectNature = document.querySelectorAll(".btn-header")
let barSearch = document.querySelector("#searchPoke")
let containerHabilites = document.querySelector(".search-card")
let btnSearch = document.querySelector("#btnSearch")

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
       
    container.innerHTML+=` 
    <div class="card">
        <div class="card-header">
            <p>#${pokemon.id}</p>
            <img src="${pokemon.sprites.other.home.front_default}" alt="">
            </div>
        <div class="card-body">
            <h3>${pokemon.name}</h3>
            <div class = "powers">
                ${naturaleza.join("")}
            </div>
            <button class="btn-Id" id="btnId" data-id="${pokemon.id}">Mostrar mas</button>
        </div>
    </div>`
}

btnSelectNature.forEach(boton => boton.addEventListener("click", async (e) => {
    const btnListID = e.currentTarget.id
    container.innerHTML = ""
    if(btnListID === "ver-todos"){
        btnBack.style = "display:block"
        btnNext.style = "display:block"
        return rangePokemones(offset, limit)
    }
     
    for (let i = 1; i<= 151; i++){
        const promise = await fetch(url+i)
        const result = await promise.json()
        
            const tipos = result.types.map(e=> e.type.name)
            if(tipos.some(tipo=> tipo.includes(btnListID)))
            {
                btnBack.style = "display:none"
                btnNext.style = "display:none"
                createCardPokemon(result)
             }
        }
       
        }   ))
rangePokemones(offset, limit)

container.addEventListener("click", searchById)
function searchById(e){
    if(e.target.classList.contains("btn-Id")){
        const pokemonId = parseInt(e.target.dataset.id)
        console.log(pokemonId);
        //funcion buscadora de pokemones
        searchByIdOrName(pokemonId)
    }
}

async function searchByIdOrName(dato){
    const response = await fetch(url+dato)
    const result = await response.json()
    console.log(url+dato)
    let naturaleza = result.types.map((e)=> `<p class = "${e.type.name}" >${e.type.name}</p>`)
    containerHabilites.innerHTML = `
    <h3>${result.name}</h3>
                <div class="nature">
                    ${naturaleza.join("")}
                </div>
                <div class="search-card-header">
                    <img src="${result.sprites.other.home.front_default}" alt="">
                </div>
                <div class="search-card-body">
                    <p>${result.stats[0].stat.name} <span>${result.stats[0].base_stat}</span></p>
                    <p>${result.stats[1].stat.name} <span>${result.stats[1].base_stat}</span></p>
                    <p>${result.stats[2].stat.name} <span>${result.stats[2].base_stat}</span></p>
                    <p>${result.stats[3].stat.name} <span>${result.stats[3].base_stat}</span></p>
                    <p>${result.stats[4].stat.name} <span>${result.stats[4].base_stat}</span></p>
                </div>
    `
}

btnSearch.addEventListener("click", () => {
    let elemento = barSearch.value
    searchByIdOrName(elemento.toLowerCase())
})