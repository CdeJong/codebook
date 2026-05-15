import {shallowMount} from '@vue/test-utils';
import UserList from '@/components/UserList.vue';


describe('UserList', () => {
    it('should render all users provided', () => {
        // Arrange
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findAllByDataTest('user-item')).toHaveLength(4);
        
    });

    it('should render the first username correctly', () => {
        // Arrange
        const expectedResult = 'Tester';
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findByDataTest('user-name').text()).toBe(expectedResult);
    });

    it('should render the first email correctly', () => {
        // Arrange
        const expectedResult = 'tester@example.com';
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findByDataTest('user-email').text()).toBe(expectedResult);
    });

    it('should render delete buttons for each user', () => {
        // Arrange
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findAllByDataTest('delete-button')).toHaveLength(4);
    });

    it('should render \'no users message\' when an empty array was provided', () => {
        // Arrange
        const users = [];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findAllByDataTest('user-item')).toHaveLength(0);
        expect(wrapper.findByDataTest('empty-state').exists()).toBe(true);
    });

    it('should NOT render \'no users message\' when a filled user array is provided', () => {
        // Arrange
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findAllByDataTest('user-item')).toHaveLength(4);
        expect(wrapper.findByDataTest('empty-state').exists()).toBe(false);
    });

    it('should render user list when a filled user array is provided', () => {
        // Arrange
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        
        // Assert
        expect(wrapper.findAllByDataTest('user-item')).toHaveLength(4);
        expect(wrapper.findByDataTest('user-list').exists()).toBe(true);
    });

    // Coverage
    it('should emit delete (with the correct id) on clicking the delete button', async () => {
        // Arrange
        const id = 0
        const users = [
            { id: 0, name: 'Tester', email: 'tester@example.com' },
            { id: 1, name: 'User', email: 'user@example.com' },
            { id: 2, name: 'Admin', email: 'admin@example.com' },
            { id: 3, name: 'Owner', email: 'owner@example.com' }
        ];

        // Act
        const wrapper = shallowMount(UserList, { props: { users } });
        await wrapper.findAllByDataTest('delete-button')[id].trigger('click');

        // Assert
        expect(wrapper.emitted('delete')?.[0]).toStrictEqual([id]);
    });

});