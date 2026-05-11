import { filterEven } from "@/utils/array";

describe('filterEven function', () => {

    describe('basic operations', () => {

        it('should filter even numbers out a mixed array', () => {
            // Arrange
            const numbers = [1, 2, 3, 4, 5, 6];
            const expectedResult = [2, 4, 6];

            // Act
            const result = filterEven(numbers);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(result).toHaveLength(3);
        });

        it('should filter even numbers out an array with just even numbers', () => {
            // Arrange
            const numbers = [2, 4, 6];
            const expectedResult = [2, 4, 6];

            // Act
            const result = filterEven(numbers);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(result).toHaveLength(3);
        });

        it('should filter even numbers out an array with just odd numbers', () => {
            // Arrange
            const numbers = [1, 3, 5];
            const expectedResult : number[] = [];

            // Act
            const result = filterEven(numbers);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(result).toHaveLength(0);
        });

        it('should filter even numbers out an empty array', () => {
            // Arrange
            const numbers : number[] = [];
            const expectedResult : number[] = [];

            // Act
            const result = filterEven(numbers);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(result).toHaveLength(0);
        });

    });

    describe('edge cases', () => {

        it('should filter even numbers out an array containing a zero', () => {
            // Arrange
            const numbers = [0, 1, 2];
            const expectedResult : Number[] = [0, 2];

            // Act
            const result = filterEven(numbers);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(result).toHaveLength(2);
        });

        it('should filter even numbers out an array containing negative numbers', () => {
            // Arrange
            const numbers = [-2, -1, 0, 1, 2];
            const expectedResult = [-2, 0, 2];

            // Act
            const result = filterEven(numbers);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(result).toHaveLength(3);
        });
        

    });

});