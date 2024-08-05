import { emailTemplate } from "../../src/js-foundation/01-template"


describe('js-foundation/01-template', () => {
    test('email template should contain a greeting',() => {
        expect(emailTemplate).toContain('Hola, ')
    })

    test('email template should contain {{name}} and {{orderId}}', ()=>{

        expect( emailTemplate ).toMatch(/name/)
        expect( emailTemplate ).toMatch('{{orderId}}')

        expect( emailTemplate ).toContain('{{name}}')
        expect( emailTemplate ).toContain('{{orderId}}')
    })


})