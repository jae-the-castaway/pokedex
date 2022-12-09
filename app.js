const pokedex = document.getElementById('pokedex');

const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
};

// fetch 150 pokemon and display
function fetchPokemon() {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.front_default,
            type: result.types.map((type) => type.type.name),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

// callback function to render pokemon on screen
function displayPokemon(pokemon) {
    const pokemonHTMLString = pokemon
    .map(
        (poke) => `
    <li class="card container flex-center ">
        <img class="card-image" src="${poke.image}"/>
        <h2 class="card-number">#${poke.id}</h2>
        <h3 class="card-title">${capitalizeFirstText(poke.name)}</h3>
        ${getTypeContainers(poke.type)}
    </li>
`
    )
    .join('');
pokedex.innerHTML = pokemonHTMLString;
};

/**get type containers for pokemon infos */
function getTypeContainers(typesArray) {
    let htmlToReturn = '<div class="card-type flex-center">';

    for (let i = 0; i < typesArray.length; i++) {
        htmlToReturn += `<div class="type-container " style="background: ${typeColors[typesArray[i]]}; color: ${getTypeTextColor(typesArray[i])} ">
                                ${capitalizeFirstText(typesArray[i])}
                            </div>`;
    };

    return htmlToReturn + '</div>';
};

// !!! return color code
function getTypeTextColor(type) {
    const darkColors = ["fighting", "flying", "poison", "water", "dragon", "psychic", "grass", "fire", "bug", "dark"];
if (darkColors.indexOf(type) !== -1) {
    return "#fafafa";
} else {
    return "#1f1f1f";
}
};

// capitalize first letter of text and return the text
function capitalizeFirstText(text) {
    const firstLetter = text.charAt(0).toUpperCase();
    return `${firstLetter}${text.substring(1)}`
}




fetchPokemon();