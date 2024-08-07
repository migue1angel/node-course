
interface User {
    id: number,
    name: string
}

const users : User[] = [
    {id: 1, name: 'Jhon Doe'},
    {id: 2, name: 'Carlos'},
    {id: 3, name: 'Esteban'},
    {id: 4, name: 'Federico'},
]

interface CallbackModel {
    (err?:string, user?:User) : void   
}

export function getUserById(id:number, callback:CallbackModel){
    const user = users.find((user)=>{
        return user.id === id;
    })

    if(!user) {
        return callback(`USER with id ${id} not found`);
    }
    
    return callback(undefined, user);
}   
