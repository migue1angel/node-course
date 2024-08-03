// JAVASCRIPT
// const buildMakePerson = ({getUUID, getAge}) => {

//     return ({ name, birthdate }) => {
//         return {
//             id: getUUID(),
//             name,
//             birthdate,
//             age: getAge(birthdate),
//         }
//     }
// }

// module.exports = { 
//     buildMakePerson,
//  }

// TYPESCRIPT

interface buildMakePersonParams {
    getUUID: () => string
    getAge: (birthdate: string) => number
}

interface Person {
    name:string,
    birthdate:string
}

export const buildMakePerson = ({getUUID, getAge}:buildMakePersonParams) => {
    return ({ name, birthdate }: Person) => {
        return {    
            id: getUUID(), 
            name,
            birthdate,
            age: getAge(birthdate),
        }
    }
}