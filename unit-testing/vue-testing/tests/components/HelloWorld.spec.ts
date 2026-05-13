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
});