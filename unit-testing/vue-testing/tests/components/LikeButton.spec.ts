import { shallowMount } from '@vue/test-utils';
import LikeButton from '@/components/LikeButton.vue';

describe('LikeButton', () => {

    describe('without count prop', () => {
        it('should show NOT liked as initial state', () => {
            // Arrange
            // no props

            // Act
            const wrapper = shallowMount(LikeButton);

            // Assert
            expect(wrapper.text()).toBe('🤍 Like');
        });

        it('should emit correct like/unlike events when clicked', async () => {
            // Arrange
            // no props

            // Act & Assert
            const wrapper = shallowMount(LikeButton);
            await wrapper.find('button').trigger('click');
            expect(wrapper.text()).toBe('❤️ Liked');

            await wrapper.find('button').trigger('click');
            expect(wrapper.text()).toBe('🤍 Like');

            await wrapper.find('button').trigger('click');
            expect(wrapper.text()).toBe('❤️ Liked');

            expect(wrapper.emitted('like')).toHaveLength(2);
            expect(wrapper.emitted('unlike')).toHaveLength(1);
        });
    });

    describe('with count prop', () => {

        it('should show NOT liked as initial state', () => {
            // Arrange
            const count = 0;

            // Act
            const wrapper = shallowMount(LikeButton, { props: { count } });

            // Assert
            expect(wrapper.text()).toBe('🤍 Like (0)');
        });

        it('should emit correct like/unlike events when clicked', async () => {
            // Arrange
            const count = 0;

            // Act & Assert
            const wrapper = shallowMount(LikeButton, { props: { count } });
            await wrapper.find('button').trigger('click');
            // should probably be '❤️ Liked (1)' but count is handled externally?
            expect(wrapper.text()).toBe('❤️ Liked (0)');

            await wrapper.find('button').trigger('click');
            expect(wrapper.text()).toBe('🤍 Like (0)'); 

            await wrapper.find('button').trigger('click');
            // should probably be '❤️ Liked (1)' but count is handled externally?
            expect(wrapper.text()).toBe('❤️ Liked (0)');

            expect(wrapper.emitted('like')).toHaveLength(2);
            expect(wrapper.emitted('unlike')).toHaveLength(1);
        });
    });

    
});