import { shallowMount } from '@vue/test-utils';
import SearchForm from '@/components/SearchForm.vue';

describe('SearchForm', () => {
    it('should call onSubmit callback when the form gets submitted', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: {
                onSubmit: mockOnSubmit,
            },
        });
        const form = wrapper.findByDataTest('form');
        const searchInput = wrapper.findByDataTest('search-input');
        const expectedResult = 'Hello World!';

        // Act
        await searchInput.setValue(expectedResult);
        await form.trigger('submit');

        // Assert
        expect(mockOnSubmit).toHaveBeenCalled();
        expect(mockOnSubmit).toHaveBeenCalledWith(expectedResult);
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not call onSubmit callback when the search input it empty', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: {
                onSubmit: mockOnSubmit,
            },
        });
        const form = wrapper.findByDataTest('form');
        const searchInput = wrapper.findByDataTest('search-input');

        // Act
        await form.trigger('submit');

        // Assert
        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });

    it('should fire the \'search\' event when the form gets submitted', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: {
                onSubmit: mockOnSubmit,
            },
        });
        const form = wrapper.findByDataTest('form');
        const searchInput = wrapper.findByDataTest('search-input');
        const expectedResult = 'Hello World!';

        // Act
        await searchInput.setValue(expectedResult);
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('search')).toBeTruthy();
        // first array are emits, second array the emit argument values; so in this case just one string per call
        expect(wrapper.emitted('search')).toStrictEqual([['Hello World!']]);
        
    });

    it('should not fire the \'search\' event when the search input it empty', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: {
                onSubmit: mockOnSubmit,
            },
        });
        const form = wrapper.findByDataTest('form');
        const searchInput = wrapper.findByDataTest('search-input');

        // Act
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('search')).toBeFalsy();
    });

    

    
});