const {httpClient} = require('../plugins/http-client.plugin.js');

const getPokemonById = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await httpClient.get(url);
    if(!pokemon) return new Error(`Pokemon with id ${id} not found`);
    return pokemon.name;


    // return fetch(url)
    //     .then(response => {

    //         return response.json()
    //     })
    //     .then(pokemon => pokemon.name);
};

module.exports = { getPokemonById }