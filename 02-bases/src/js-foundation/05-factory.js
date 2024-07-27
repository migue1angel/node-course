const {v4: uuidv4} = require('uuid');
const obj = {name: 'Jhon', birthdate: '2003-06-03'};
const getAge = require ('get-age')

const buildPerson = ({name, birthdate}) => {

    return user = {
        id : uuidv4(),
        name,
        birthdate,
        age : getAge(birthdate)
    }

}

module.exports = { buildPerson}