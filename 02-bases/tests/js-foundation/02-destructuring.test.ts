import { characters } from "../../src/js-foundation/02-destructuring";


describe('js-foundation/02-destructuring', () => {
    
    test('characters should contain superman and flash', 
        () => {
        expect(characters).toContain('superman');
        expect(characters).toContain('flash');
    })
    
    test('superman should be the firs character', () => {
        const [superman] = characters;
        expect(superman).toBe('superman')
    })
} )