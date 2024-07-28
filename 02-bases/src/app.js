
const {getPokemonById} = require('./js-foundation/06-promises')

const pokemonInfo = getPokemonById(4)
.then(pokemon =>console.log({pokemon}))
.catch(err => console.log(err))
.finally(() => console.log('Fin del programa'))



// Adapt pattern
// const { getUUID, getAge } = require('./plugins');
// const { getUUID, getAge } = require('./plugins');

// const { buildMakePerson} = require ('./js-foundation/05-factory');

// const makePerson = buildMakePerson({getUUID, getAge});

// const jhon = makePerson({ name: 'Jhon', birthdate: '2003-06-03' });
// console.log(jhon);



// const { getUserById } = require('./js-foundation/03-callbacks')

// const user = getUserById(4, (err, user) => {
//     if(err) return console.log(err)

    
//     return console.log(user);
// })
