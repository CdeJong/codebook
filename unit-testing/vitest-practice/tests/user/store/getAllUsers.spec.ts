import { getAllUsers } from "@/users/store";

describe('getAllUsers function', () => {

    describe('edge cases', () => {

        it('Test if result is immutatable', () => {
            // Arrange
            const users = getAllUsers();

            // Act
            users.push({id: 4, name: 'Chris', active: true});
            // each getAllUsers() call should return a new array, so 'push' above is never added to the store array
            // this way an api can force you to use their add/modify functions
            const newUsers = getAllUsers();

            // Assert
            expect(users).toHaveLength(4);
            expect(newUsers).toHaveLength(3);
        });

    });

});