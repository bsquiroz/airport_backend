const axios = require("axios");

const httpClient = {
    get: async (url) => {
        const { data } = await axios.get(url);
        return data;
    },
    post: async (url, body) => {
        throw new Error("Not implement");
    },
    patch: async (url, body, term) => {
        throw new Error("Not implement");
    },
    delete: async (url) => {
        throw new Error("Not implement");
    },
};

module.exports = {
    httpClient,
};
