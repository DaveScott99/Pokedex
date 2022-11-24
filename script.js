const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

// Criando um Array para armazenar a resposta do Fetch
const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

// Função para gerar o HTML
const generateHTML = pokemons => pokemons.reduce((accumulator,{ name, id, types, sprites }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);
    accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="${sprites['versions']['generation-v']['black-white']['animated']['front_default']}"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(" | ")}</p>
        </li>`
    return accumulator;
}, '')


// Função para inserir os pokemons no HTML
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
        .then(generateHTML)
        .then(insertPokemonsIntoPage);