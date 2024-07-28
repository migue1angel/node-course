const {getUUID} = require('../plugins/get-id.plugin.js');
const {getAge} = require ('../plugins/get-age.plugin.js')
const {httpClient} = require ('../plugins/http-client.plugin.js')

module.exports = {
    getUUID,
    getAge,
    httpClient
}