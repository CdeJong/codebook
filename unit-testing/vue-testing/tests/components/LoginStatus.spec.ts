import LoginStatus from '@/components/LoginStatus.vue';
import { shallowMount } from '@vue/test-utils';

describe('LoginStatus', () => {

    it('should show welcome message when status is \'loggedIn\'', () => {
        // Arrange
        const status = 'loggedIn';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.welcome').exists()).toBe(true);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(false);
    });

    it('should show logged out message when status is \'loggedOut\'', () => {
        // Arrange
        const status = 'loggedOut';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(true);
        expect(wrapper.find('.loading').exists()).toBe(false);
    });

    it('should show loading message when status is \'loading\'', () => {
        // Arrange
        const status = 'loading';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(true);
    });

    it('should show loading message when status is invalid', () => {
        // Arrange
        const status = 'debug';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(true);
    });

    
});