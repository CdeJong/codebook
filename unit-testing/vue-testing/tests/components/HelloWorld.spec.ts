import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld', () => {
    it('should mount without errors', () => {
        // Arrange
        const msg = 'Hello Vitest';

        // Act
        const wrapper = shallowMount(HelloWorld, { props: { msg } });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    // coverage

    it('should increase the counter on button click', async () => {
        // Arrange
        const msg = 'Hello Vitest';
        const wrapper = shallowMount(HelloWorld, { props: { msg } });

        // Act & Assert
        expect(wrapper.findByDataTest('counter-button').text()).toBe('Count is 0');
        await wrapper.findByDataTest('counter-button').trigger('click');
        expect(wrapper.findByDataTest('counter-button').text()).toBe('Count is 1');
        await wrapper.findByDataTest('counter-button').trigger('click');
        expect(wrapper.findByDataTest('counter-button').text()).toBe('Count is 2');
        await wrapper.findByDataTest('counter-button').trigger('click');
        expect(wrapper.findByDataTest('counter-button').text()).toBe('Count is 3');
    });
});