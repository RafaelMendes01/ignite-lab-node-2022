import { Content } from "./content"

describe('notification content', () => {
    it('it should be able to create a notification content', () => {
        const content = new Content('você recebeu uma solicitação de amizade')

        expect(content).toBeTruthy()
    })
    it('it should not be able to create a notification content with less than five characters', () => {
        expect(() => { new Content('vo') }).toThrowError()
    })
    it('it should not be able to create a notification content with more than 240 characters', () => {
        expect(() => { new Content('v'.repeat(241)) }).toThrowError()
    })
})
