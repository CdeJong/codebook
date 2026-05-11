import { capitalize } from "@/utils/string";

describe('capitalize function', () => {

    describe('basic operations', () => {

        it('should capitalize the first character correctly', () => {
            // Arrange
            const value = 'hello';
            const expectedResult = 'Hello';

            // Act
            const result = capitalize(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should capitalize the first character correctly (without undoing existing)', () => {
            // Arrange
            const value = 'Hello';
            const expectedResult = 'Hello';

            // Act
            const result = capitalize(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

    });

    describe('edge cases', () => {

        it('should return empty when empty value', () => {
            // Arrange
            const value = '';
            const expectedResult = '';

            // Act
            const result = capitalize(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should not trim or remove whitespaces', () => {
            // Arrange
            const value = '   ';
            const expectedResult = '   ';

            // Act
            const result = capitalize(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should ignore uncapitalizable characters', () => {
            // Arrange
            const value = '123abc';
            const expectedResult = '123abc';

            // Act
            const result = capitalize(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

    });

});