import { httpClient } from "../../src/plugins";

describe('http-client.plugin/plugins', () => {

    test('http client should return an object', async () => {
        const data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');

        expect(data).toEqual({
            id: 1,
            userId: 1,
            title: 'delectus aut autem',
            completed: expect.any(Boolean) // you can use expect.any() with any type, to evaluate the type and not the value as such
        });
    });

    test('http client plugin shuld have POST, PUT AND DELETE methods', () =>{

        expect(httpClient).toHaveProperty('post')
        expect(httpClient).toHaveProperty('put')
        expect(httpClient).toHaveProperty('delete')
        expect(typeof httpClient.post).toBe('function')
        expect(typeof httpClient.post).toBe('function')
        expect(typeof httpClient.post).toBe('function')
    })
})