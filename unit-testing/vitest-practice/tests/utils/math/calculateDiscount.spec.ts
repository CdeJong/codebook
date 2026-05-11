import { calculateDiscount } from "@/utils/math";

describe('calcutateDiscount function', () => {

    describe('basic operations', () => {

        it('should handle normal discount correctly', () => {
            // Arrange
            const price = 100;
            const discount = 20; // 20%
            const expectedResult = 80;

            // Act
            const result = calculateDiscount(price, discount);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should handle 0% discount correctly', () => {
            // Arrange
            const price = 100;
            const discount = 0; // 0%
            const expectedResult = 100;

            // Act
            const result = calculateDiscount(price, discount);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should handle 100% discount correctly', () => {
            // Arrange
            const price = 100;
            const discount = 100; // 100%
            const expectedResult = 0;

            // Act
            const result = calculateDiscount(price, discount);

            // Assert
            expect(result).toBe(expectedResult);
        });

        

    });
    
    describe('edge cases', () => {
        
        it('should throw when discount is negative', () => {
            // Arrange
            const price = 100;
            const discount = -10; // -10%

            // Act & Assert
            expect(() => calculateDiscount(price, discount)).toThrow(Error);
        });

        it('should throw when discount greater than 100', () => {
            // Arrange
            const price = 100;
            const discount = 150; // 150%

            // Act & Assert
            expect(() => calculateDiscount(price, discount)).toThrow(Error);
        });

        it('should handle zero price correctly', () => {
            // Arrange
            const price = 0;
            const discount = 20; // 20%
            const expectedResult = 0;

            // Act
            const result = calculateDiscount(price, discount);

            // Assert
            expect(result).toBe(expectedResult);
        });

        it('should throw when price less than 0', () => {
            // Arrange
            const price = -50;
            const discount = 10; // 10%

            // Act & Assert
            expect(() => calculateDiscount(price, discount)).toThrow(Error);
        });

        

    });

});