import {httpClient} from '../plugins';
export const getPokemonById = async (id : string | number):Promise<string> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await httpClient.get(url);
    if(!pokemon) return `Pokemon with id ${id} not found`;
    return pokemon.name;


    // return fetch(url)
    //     .then(response => {

    //         return response.json()
    //     })
    //     .then(pokemon => pokemon.name);
};
