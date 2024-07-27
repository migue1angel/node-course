
const users = [
    {id: 1, name: 'Miguel'},
    {id: 2, name: 'Carlos'},
    {id: 3, name: 'Esteban'},
    {id: 4, name: 'Federico'},
]

function getUserById(id, callback) {
    const user = users.find((user)=>{
        return user.id === id;
    })

    if(!user) {
        return callback(`USER with id ${id} not found`);
    }
    
    return callback(null, user);
}   

module.exports = { getUserById};