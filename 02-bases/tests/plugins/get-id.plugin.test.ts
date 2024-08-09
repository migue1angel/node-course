import { getUUID } from "../../src/plugins";

describe('getUUID plugin/plugins', () => {

    test('getUUID should return a UUID', () =>{ 
        const id = getUUID();

        expect(typeof id).toBe('string');
        expect(id.length).toBe(36);
        expect(id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    })

})