import {shallowMount} from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter', () => {
    it('should increment count when button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.text()).toContain('Count: 1');
    });

    it('should emit increment event with correct value', async () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.emitted('increment')?.[0]).toStrictEqual([1]);
    });

    it('should emit multiple increment events with correct values', async () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Act
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.emitted('increment')).toHaveLength(3);
        expect(wrapper.emitted('increment')?.[0]).toStrictEqual([1]);
        expect(wrapper.emitted('increment')?.[1]).toStrictEqual([2]);
        expect(wrapper.emitted('increment')?.[2]).toStrictEqual([3]);
    });

    it('should have a default count of zero', async () => {
        // Arrange
        const wrapper = shallowMount(Counter);

        // Act
        // no clicks

        // Assert
        expect(wrapper.text()).toContain('Count: 0');
    });
});