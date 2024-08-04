

describe('App', () => {
    it('should be thirty', () => {

        //    1. Arrange
        const num1 = 10;
        const num2 = 50;

        //    2. Act
        const result = num1 + num2 - 30;

        //    3. Assert
        expect(result).toBe(30);

    })
})