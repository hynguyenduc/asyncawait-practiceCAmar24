import { getMultiplePokemon, getOnePokemon } from "./encounterSystem.js";

let encounterOneButton = document.getElementById("encounter-one");
let encounterSixButton = document.getElementById("encounter-six");

encounterOneButton.addEventListener("click", async () => {
    let result = await getOnePokemon();
    console.log(result);
    result = [result];
    localStorage.setItem("wildPokemon", JSON.stringify(result));

    renderData();
    // getOnePokemon().then(data => console.log(data));
})

encounterSixButton.addEventListener("click", async () => {
    let result = await getMultiplePokemon();
    console.log(result);
    localStorage.setItem("wildPokemon", JSON.stringify(result));

    renderData();
})

function renderData() {
    // Retrieve data from local storage
    let pokemonData = localStorage.getItem("wildPokemon");

    // console.log(pokemonData);
    // console.log(typeof pokemonData);

    pokemonData = JSON.parse(pokemonData) // changes string information into object data

    // Reference to reuse
    let wildPokemonContainer = document.getElementById("pokemon-encounters");
    wildPokemonContainer.innerHTML = "";

    pokemonData.forEach(pokemon => {
        // Build HTML elements to display the data
        let newElement = buildPokemonDisplayElement(pokemon);

        // Insert the new HTML element into the current page
        wildPokemonContainer.appendChild(newElement);
    });

}

function buildPokemonDisplayElement(pokemonData) {
    if (!pokemonData) {
        return;
    }

    let pokemonContainer = document.createElement("div");

    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainer.appendChild(pokemonHeading);

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonContainer.appendChild(pokemonImage);

    return pokemonContainer;
}