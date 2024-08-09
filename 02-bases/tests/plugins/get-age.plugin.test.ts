import { getAge } from "../../src/plugins";

describe('getAge-plugin/plugins', () => {

    test('get Age should return a number', () => {
        const birthdate = '2000-02-04'
        const age = getAge(birthdate);
        expect(typeof age).toBe('number')
    })
    
    test('getAge should return the age of a person', () => {
        const birthdate = '2000-02-04'
        const age = getAge(birthdate);
        const expectedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(expectedAge).toBe(age);
    })
    
    test('getAge should return 0 years', () => {
        
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);
        const birthdate = '1995-02-04'
        const age = getAge(birthdate);

        expect(age).toBe(0);

    })
})