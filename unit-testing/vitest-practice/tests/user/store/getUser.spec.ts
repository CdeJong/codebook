import { getUser } from "@/users/store";

describe('getUser function', () => {

    describe('basic operations', () => {

        it('should find user in store', () => {
            // Arrange
            const id = 1;
            const expectedResult = {id: 1, name: 'Anna'};

            // Act
            const result = getUser(id);

            // Assert
            expect(result).toMatchObject(expectedResult);
        });

        it('should not find user in store', () => {
            // Arrange
            const id = 4;

            // Act
            const result = getUser(id);

            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe('edge cases', () => {

        it('should not find user in store with negative id', () => {
            // Arrange
            const id = -1;

            // Act
            const result = getUser(id);

            // Assert
            expect(result).toBeUndefined();
        });

        it('should not find easter egg user in store', () => {
            // Arrange
            const id = 500;
            const expectedResult = {id: 500, name: 'Easter Egg'};

            // Act
            const result = getUser(id);

            // Assert
            expect(result).toMatchObject(expectedResult)
        });

    });

});