const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const darkMode = document.getElementById('poke')
const body = document.body;
const maxRecords = 151
const limit = 9
let offset = 0;



function convertPokemonTypesToLi(pokemonTypes) {
	return pokemonTypes.map((typeSlot) => `<li class="type">${type}`)
}


//~~~~~~~~~Código de consumo de API ~~~~~~~~
//Retorna uma promise
//then processa o sucesso da promise
function loadPokemonItens(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map((pokemon) => `
			<li name="${pokemon.name}" class="pokemon ${pokemon.type}">
						<span class="number">#00${pokemon.number}</span>
						<span class="name">${pokemon.name}</span>
		
						<div class="detail">
							<ol class="types">
								${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
							</ol>
							<img src="${pokemon.photo}" 
								alt="${pokemon.name}">
						</div>
					</li>
				`).join('')

		pokemonList.innerHTML += newHtml
	})
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
	offset += limit

	const qtdRecordWithNexPage = offset + limit

	if (qtdRecordWithNexPage >= maxRecords) {
		const newLimit = maxRecords - offset
		loadPokemonItens(offset, newLimit)

		loadMoreButton.parentElement.removeChild(loadMoreButton)
	} else {
		loadPokemonItens(offset, limit)
	}
	
})

darkMode.addEventListener('click', () =>{
	body.classList.toggle('darkmode')
})


