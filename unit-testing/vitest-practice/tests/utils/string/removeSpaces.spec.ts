import { removeSpaces } from "@/utils/string";

describe('removeSpaces function', () => {

    describe('basic operations', () => {

        it('should remove spaces in a sentence', () => {
            // Arrange
            const value = 'I am walking the dog.';
            const expectedResult = 'Iamwalkingthedog.';

            // Act
            const result = removeSpaces(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should return same value if no spaces in value', () => {
            // Arrange
            const value = 'Iamwalkingthedog.';
            const expectedResult = 'Iamwalkingthedog.';

            // Act
            const result = removeSpaces(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should trim spaces around the actual \'content\'', () => {
            // Arrange
            const value = '   dog   ';
            const expectedResult = 'dog';

            // Act
            const result = removeSpaces(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

    });

    describe('edge cases', () => {

        it('should return empty if value is blank', () => {
            // Arrange
            const value = '   ';
            const expectedResult = '';

            // Act
            const result = removeSpaces(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should return empty if value is empty', () => {
            // Arrange
            const value = '';
            const expectedResult = '';

            // Act
            const result = removeSpaces(value);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should not remove special characters or numbers', () => {
            // Arrange
            const value = ' 1 2 3 A B C a b c $ @ # é ñ 👋 ';
            const expectedResult = '123ABCabc$@#éñ👋';

            // Act
            const result = removeSpaces(value);

            // Assert
            expect(result).toBe(expectedResult);
        });
        
    });

});