const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const bottonPrev = document.querySelector('.btn-prev')
const bottonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (apiResponse.status === 200) {
        const data = await apiResponse.json()

        return data
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading... '
    pokemonNumber.innerHTML = ''
    
    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block'

        pokemonName.innerHTML = data.name;

        pokemonNumber.innerHTML = data.id
    
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = ''

        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :/'
        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    
    console.log(input.value)

    renderPokemon(input.value.toLowerCase())
})

bottonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1
    renderPokemon(searchPokemon)
    }
    
})

bottonNext.addEventListener('click', () =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)