import { addUser, EasterEggError, getAllUsers, IllegalArgumentError } from "@/users/store";

describe('addUser function', () => {

    describe('basic operations', () => {

        it('should add a user to the store', () => {
            // Arrange
            const user = {id: 4, name: 'Chris', active: true};

            // Act
            addUser(user);
            const users = getAllUsers();

            // Assert
            expect(users).toHaveLength(4);
        });
    });

    describe('edge cases', () => {

        it('should throw when id is already used', () => {
            // Arrange
            const user = {id: 4, name: 'Chris', active: true};

            // Act & Assert
            expect(() => addUser(user)).toThrow(IllegalArgumentError);
            const users = getAllUsers();
            expect(users).toHaveLength(4); // 3 default + the 1 we added
        });

        it('should throw when id is used for easter egg', () => {
            // Arrange
            const user = {id: 500, name: 'Chris', active: true};

            // Act & Assert
            expect(() => addUser(user)).toThrow(EasterEggError);
            const users = getAllUsers();
            expect(users).toHaveLength(4); // 3 default + the 1 we added
        });
    });
});