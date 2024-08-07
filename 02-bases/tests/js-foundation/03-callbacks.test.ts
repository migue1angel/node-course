import { getUserById } from "../../src/js-foundation/03-callbacks";


describe('js-foundation/callbacks',()=>{

    test('user does not exist', (done)=>{
        const id = 10;
        getUserById(id,(err,user) => {
            expect(err).toContain('not found');
            expect(user).toBeUndefined();
            done();
        });

    });

    test('user exists', (done)=>{
        const id = 1;
        getUserById(id, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toEqual( {id:1, name:'Jhon Doe'} );
            done();
        });
    });

});