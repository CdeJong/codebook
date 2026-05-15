import {shallowMount} from '@vue/test-utils';
import ClickButton from '@/components/ClickButton.vue';

describe('ClickButton', () => {
    it('should call onClick callback when button is clicked', async () => {
        // Arrange
        const mockOnClick = vi.fn();
        const wrapper = shallowMount(ClickButton, {
            props: {
                label: 'Click me',
                onClick: mockOnClick,
            },
        });

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('should call onClick with incremented count', async () => {
        // Arrange
        const mockOnClick = vi.fn();
        const wrapper = shallowMount(ClickButton, {
            props: {
                label: 'Click me',
                onClick: mockOnClick,
            },
        });

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(mockOnClick).toHaveBeenCalledWith(1);

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(mockOnClick).toHaveBeenCalledWith(2);
    });
});