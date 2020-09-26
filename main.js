const poke_container = document.getElementById("poke_container");
const pokemons_number = 20;

let pokemList = [];
const fetchPokemons = async () => {
  poke_container.innerHTML = "";
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  pokemList.push(pokemon);
  createPokemonCard(pokemon);
  console.log(pokemon.id);
};

const searchPokemonByName = () => {
  console.log("entered search bar");
  let name = document.getElementById("searchBarName").value;
  name = name.toLowerCase();
  for (i = 0; i < pokemList.length; i++) {
    if (name == pokemList[i].forms[0].name.toLowerCase()) {
      poke_container.innerHTML = "";
      createPokemonCard(pokemList[i]);
    }
  }
};

const refresh = () => {
  pokemList = [];
  fetchPokemons();
};
const searchPokemonByNumber = () => {
  console.log("entered search bar");
  let number = document.getElementById("searchBarNumber").value;
  for (i = 0; i < pokemList.length; i++) {
    if (number == pokemList[i].id) {
      poke_container.innerHTML = "";
      createPokemonCard(pokemList[i]);
    }
  }
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const { id, name, sprites, types } = pokemon;
  const type = types[0].type.name;
  const pokeInnerHTML = `
  <div class="img-container">
    <img src="${sprites.front_default}" alt="${name}" />
  </div>
  <div class="info">
    <span class="number">${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
