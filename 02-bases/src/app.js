

// const {emailTemplate} = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');

// const {getUserById} = require ('./js-foundation/03-callbacks');
// const {getUserById} = require ('./js-foundation/04-arrow');
const { buildPerson} = require ('./js-foundation/05-factory');


const user = buildPerson({name: 'Joaquin', birthdate: '2005-06-28'});
console.log(user);
