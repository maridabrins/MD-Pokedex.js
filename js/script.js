// https://pokeapi.co/api/v2/pokemon/ditto

//pegamos 1º pegamos todos os ids do HTML e instanciamos no Js
let pokemonImage = document.getElementById("pokemon_image")
let pokemonNumber = document.getElementById("pokemon_number")
let pokemonName = document.getElementById("pokemon_name")

let btnSearch = document.getElementById("btn-search")
let input = document.getElementById("input_search")

let searchPokemon = 1

let btnPrev = document.getElementById("btn-prev")
let btnNext = document.getElementById("btn-next")

/// função que vai renderizar o pokemon
function renderPokemon(pokemon){ //parametro
    fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res)=> res.json())
        .then((data)=> {
            console.log(data.sprites.versions["generation-v"]["black-white"].animated.front_default)

            pokemonImage.style.display= "block" //para o pokemon aparecer dps de tratar ele no catch
            input.value = "" // ficar vazio dps de digitar
            //aparecer nome do pokemon
            pokemonName.innerText = data.name
            pokemonNumber.innerText = data.id
            pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default //estamos buscando uma imagem então usamos o src
            searchPokemon = data.id //quando ele busca o pokemon ele recebe o id dele
        })
        .catch((err)=>{
            pokemonName.innerText = "Não encontrado!"

            //tratamento de erro
            pokemonImage.style.display = "none" // se o pokemon não exitir o gif não aparece
            pokemonNumber.innerText = "" //não aparecer nenhum id
        })
       
}

btnSearch.addEventListener("click", function(event){
    event.preventDefault() 
    renderPokemon(input.value) //chamando o nome digitado no input
})

//função de ir para o pokemon anterior
btnPrev.addEventListener("click", function(){
    //verificação: não existe pokemon 0 então ele nao deve voaltar
    if(searchPokemon > 1){ // se o id for maior que 1 ele volta pro anterior
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})
//função para ir para o proximo pokemon
btnNext.addEventListener("click", function(){

    if(searchPokemon >= 1){
        searchPokemon += 1
        renderPokemon(searchPokemon)
    }
})

renderPokemon("1")
