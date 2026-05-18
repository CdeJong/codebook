import { shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

// clear all mock calls, or they will persist between tests, making 'times' functions fail 
beforeEach(() => vi.clearAllMocks());

describe('TodoItem', () => {
    it('should render text correctly', () => {
        // Arrange
        const expectedResult = 'Hello World!';
        const todo = { id: 1, text: expectedResult, completed: false };

        // Act
        const wrapper = shallowMount(TodoItem, { props: { todo } });
        // Assert
        expect(wrapper.findByDataTest('todo-text').text()).toBe(expectedResult);
    });

    it('should show completed styling when completed', () => {
        // Arrange
        const todo = { id: 1, text: 'Hello World!', completed: true };

        // Act
        const wrapper = shallowMount(TodoItem, { props: { todo } });

        // Assert
        expect(wrapper.findByDataTest('todo-text').element.classList.contains('completed')).toBe(true);
    });

    it('should NOT show completed styling when NOT completed', () => {
        // Arrange
        const todo = { id: 1, text: 'Hello World!', completed: false };

        // Act
        const wrapper = shallowMount(TodoItem, { props: { todo } });

        // Assert
        expect(wrapper.findByDataTest('todo-text').element.classList.contains('completed')).toBe(false);
    });

    it('should check completed checkbox when completed', () => {
        // Arrange
        const todo = { id: 1, text: 'Hello World!', completed: true };

        // Act
        const wrapper = shallowMount(TodoItem, { props: { todo } });

        // Assert
        expect(wrapper.findByDataTest('todo-checkbox').element.checked).toBe(true);
    });

    it('should NOT check completed checkbox when NOT completed', () => {
        // Arrange
        const todo = { id: 1, text: 'Hello World!', completed: false };

        // Act
        const wrapper = shallowMount(TodoItem, { props: { todo } });

        // Assert
        expect(wrapper.findByDataTest('todo-checkbox').element.checked).toBe(false);
    });

    it('should emit toggle event when the completed checkbox is clicked', async () => {
        // Arrange
        const todo = { id: 1, text: 'Hello World!', completed: false };
        const wrapper = shallowMount(TodoItem, { props: { todo } });
        const completedCheckbox = wrapper.findByDataTest('todo-checkbox');

        // Act
        await completedCheckbox.setChecked(true); // runs change event

        // Assert
        expect(wrapper.emitted('toggle')).toHaveLength(1);
        expect(wrapper.emitted('toggle')?.[0]).toStrictEqual([todo.id]);
    });

    it('should emit delete event when the delete button is clicked', async () => {
        // Arrange
        const todo = { id: 1, text: 'Hello World!', completed: false };
        const wrapper = shallowMount(TodoItem, { props: { todo } });
        const deleteButton = wrapper.findByDataTest('delete-button');

        // Act
        await deleteButton.trigger('click');

        // Assert
        expect(wrapper.emitted('delete')).toHaveLength(1);
        expect(wrapper.emitted('delete')?.[0]).toStrictEqual([todo.id]);
    });
});