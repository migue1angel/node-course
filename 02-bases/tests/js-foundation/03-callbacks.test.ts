import { getUserById } from "../../src/js-foundation/03-callbacks";


describe('js-foundation/callbacks',()=>{

    test('user does not exist', ()=>{
        const id = 10;
        getUserById(id,(err,user) => {
            // expect(err).toContain('not found');
            // expect(user).toBeUndefined();
        });
        throw new Error('some error');

    });

})