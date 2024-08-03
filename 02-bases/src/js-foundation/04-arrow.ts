
interface User {
    id: number,
    name: string
}

interface UserCallback {
    (err?:string, user?:User):void
}

const users : User[] = [
    {id: 1, name: 'Miguel'},
    {id: 2, name: 'Carlos'},
    {id: 3, name: 'Esteban'},
    {id: 4, name: 'Federico'},
]

export const getUserById  = (id: number, callback:UserCallback) => {
    const user = users.find(user => user.id === id)

    if(!user) {
        return callback(`USER with id ${id} not found`);
    }
    
    return callback(undefined, user);
}   

