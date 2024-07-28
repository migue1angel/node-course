

const httpClient = {

    get: async (url) => {
        const response = await fetch(url);
        if(!response.ok) return null;
        const data = await response.json();
        return data;   
    },

    post : async (url, data) => {},
    put : async (url, data) => {},
    delete : async (url) => {},

}

module.exports = {httpClient}