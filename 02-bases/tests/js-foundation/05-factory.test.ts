import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe('05-fatory/js-foundation', () =>{
     
    const getUUID = () => '12334'
    const getAge = () => 43 

    test('build make person should return a function', () => {

        const makePerson  = buildMakePerson({getUUID, getAge});
        expect(typeof makePerson).toBe('function');
        
    });
    
    test('make person should return a person', () => {
        
        const makePerson  = buildMakePerson({getUUID, getAge});
        const jhon = makePerson({name:'Jhon Doe', birthdate:'2000-02-18'})
        
        expect(jhon).toEqual({ id: '12334', name: 'Jhon Doe', birthdate: '2000-02-18', age: 43 })
    })
    
});