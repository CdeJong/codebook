import { multiply } from "@/utils/math";

describe('multiply function', () => {
    describe('basic operations', () => {

        it('should handle positive numbers correctly', () => {
            // Arrange
            const firstNumber = 3;
            const secondNumber = 4;
            const expectedResult = 12;

            // Act
            const result = multiply(firstNumber, secondNumber);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should handle negative numbers correctly', () => {
            // Arrange
            const firstNumber = -2;
            const secondNumber = 3;
            const expectedResult = -6;

            // Act
            const result = multiply(firstNumber, secondNumber);

            // Assert
            expect(result).toBe(expectedResult);
        });

    });

    describe('edge cases', () => {

        it('should handle zero correctly', () => {
            // Arrange
            const firstNumber = 5;
            const secondNumber = 0;
            const expectedResult = 0;

            // Act
            const result = multiply(firstNumber, secondNumber);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should handle decimal numbers correctly', () => {
            // Arrange
            const firstNumber = 2.5;
            const secondNumber = 4;
            const expectedResult = 10;

            // Act
            const result = multiply(firstNumber, secondNumber);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should handle large numbers correctly', () => {
            // Arrange
            const firstNumber = 1_000;
            const secondNumber = 1_000;
            const expectedResult = 1_000_000;

            // Act
            const result = multiply(firstNumber, secondNumber);

            // Assert
            expect(result).toBe(expectedResult);
        });

    });

});    