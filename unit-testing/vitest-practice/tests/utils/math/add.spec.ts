import { add } from "@/utils/math";

describe('add function', () => {

    it('should add two positive numbers', () => {
        // Arrange
        const firstNumber = 2;
        const secondNumber = 3;
        const expectedResult = 5;

        // Act
        const result = add(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });

    it('should add two negative numbers', () => {
        // Arrange
        const firstNumber = -2;
        const secondNumber = -3;
        const expectedResult = -5;

        // Act
        const result = add(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });

    it('should add two zeros', () => {
        // Arrange
        const firstNumber = 0;
        const secondNumber = 0;
        const expectedResult = 0;

        // Act
        const result = add(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });

    it('should add a negative and positive number together', () => {
        // Arrange
        const firstNumber = -7;
        const secondNumber = 5;
        const expectedResult = -2;

        // Act
        const result = add(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });


});