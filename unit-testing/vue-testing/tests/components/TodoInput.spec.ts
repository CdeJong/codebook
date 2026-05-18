import { shallowMount } from '@vue/test-utils';
import TodoInput from '@/components/TodoInput.vue';


describe('TodoInput', () => {
    it('should render correct default state', () => {
        // Arrange
        const expectedResult = '';

        // Act
        const wrapper = shallowMount(TodoInput);
        
        // Assert
        expect(wrapper.findByDataTest('todo-input').text()).toBe(expectedResult);
        expect(wrapper.findByDataTest('add-button').element.disabled).toBeTruthy();
    });

    it('should emit add-todo on a valid submit', async () => {
        // Arrange
        const expectedResult = 'Buy milk at the market';

        const wrapper = shallowMount(TodoInput);
        const todoInput = wrapper.findByDataTest('todo-input');
        const form = wrapper.findByDataTest('todo-form');

        // Act
        await todoInput.setValue(expectedResult);
        await form.trigger('submit');
        
        // Assert
        expect(wrapper.emitted('add-todo')?.[0]).toStrictEqual([expectedResult]);
    });

    it('should clear input after a valid submit', async () => {
        // Arrange
        const input = 'Buy milk at the market';
        const expectedResult = '';

        const wrapper = shallowMount(TodoInput);
        const todoInput = wrapper.findByDataTest('todo-input');
        const form = wrapper.findByDataTest('todo-form');

        // Act
        await todoInput.setValue(input);
        await form.trigger('submit');
        
        // Assert
        expect(todoInput.text()).toBe('');
    });

    it('should NOT emit add-todo on an invalid submit', async () => {
        // Arrange
        const input = '   '; // blank after trim

        const wrapper = shallowMount(TodoInput);
        const todoInput = wrapper.findByDataTest('todo-input');
        const form = wrapper.findByDataTest('todo-form');

        // Act
        await todoInput.setValue(input);
        await form.trigger('submit');
        
        // Assert
        expect(wrapper.emitted('add-todo')).toBeUndefined();
    });

    it('should trim whitespaces before emit', async () => {
        // Arrange
        const input = ' Hello World! ';
        const expectedResult = 'Hello World!';

        const wrapper = shallowMount(TodoInput);
        const todoInput = wrapper.findByDataTest('todo-input');
        const form = wrapper.findByDataTest('todo-form');

        // Act
        await todoInput.setValue(input);
        await form.trigger('submit');
        
        // Assert
        expect(wrapper.emitted('add-todo')?.[0]).toStrictEqual([expectedResult]);
    });
});