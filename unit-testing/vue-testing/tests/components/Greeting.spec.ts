import { shallowMount } from '@vue/test-utils';
import Greeting from '@/components/Greeting.vue';

describe('Greeting', () => {
    it('should render the name prop', () => {
        // Arrange
        const name = 'Vitest';

        // Act
        const wrapper = shallowMount(Greeting, { props: { name } });

        // Assert
        expect(wrapper.text()).toContain('Hello, Vitest!');
    });

    it('should render the emoji prop', () => {
        // Arrange
        const name = 'Vitest';
        const emoji = '👋'

        // Act
        const wrapper = shallowMount(Greeting, { props: { name, emoji } });

        // Assert
        expect(wrapper.text()).toBe('Hello, Vitest! 👋')
    });

    it('should NOT render the emoji prop', () => {
        // Arrange
        const name = 'Vitest';

        // Act
        const wrapper = shallowMount(Greeting, { props: { name } });

        // Assert
        expect(wrapper.text()).toBe('Hello, Vitest!')
    });
});