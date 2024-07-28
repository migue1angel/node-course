
const axios = require('axios');

const httpClient = {

    get: async (url) => {
        const {data} = await axios.get(url);
        return data;   
    },

    post : async (url, data) => {},
    put : async (url, data) => {},
    delete : async (url) => {},

}

module.exports = {httpClient}