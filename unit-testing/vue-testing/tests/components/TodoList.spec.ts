import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoItem from '@/components/TodoItem.vue';

// clear all mock calls, or they will persist between tests, making 'times' functions fail 
beforeEach(() => vi.clearAllMocks());

describe('TodoList', () => {
    it('should render default state correctly', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);

        // Act & Assert
        expect(wrapper.findByDataTest('empty-state').exists()).toBe(true);
    });

    it('should add a todo correctly', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        // Act
        await todoInput.vm.$emit('add-todo', 'Buy milk at the market');

        // Assert
        expect(wrapper.findByDataTest('empty-state').exists()).toBe(false);
        expect(wrapper.findByDataTest('filters').exists()).toBe(true);
        expect(wrapper.findByDataTest('todo-list').exists()).toBe(true);

        const items = wrapper.findAllComponents(TodoItem);

        expect(items).toHaveLength(1);
        expect(items[0].props('todo')).toStrictEqual({id: 1, text: 'Buy milk at the market', completed: false});
    });

    it('should delete a todo correctly', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        // Act: add
        await todoInput.vm.$emit('add-todo', 'Buy milk at the market');

        // Assert: add
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1);

        // Act: delete
        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('delete', 1); // id starts at 1

        // Assert: delete
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(0);
    });

    it('should toggle todo completion correctly', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        // Act: add
        await todoInput.vm.$emit('add-todo', 'Buy milk at the market');

        // Assert: add
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1);

        // Act & Assert: toggle
        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('toggle', 1); // id starts at 1

        expect(items[0].props('todo').completed).toBe(true);

        await items[0].vm.$emit('toggle', 1); // id starts at 1

        expect(items[0].props('todo').completed).toBe(false);
    });

    it('should ignore invalid toggle todo completion correctly', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);
        await todoInput.vm.$emit('add-todo', 'Buy milk at the market');

        // Act & Assert: toggle invalid
        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('toggle', 2); // should be ignored if non-existing
        expect(items[0].props('todo').completed).toBe(false);
    });

    it('should show all todo items when filter is set to all', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Buy milk at the market'); // 1 
        await todoInput.vm.$emit('add-todo', 'Complete assignment Codebook'); // 2
        await todoInput.vm.$emit('add-todo', 'Push changes to remote'); // 3
        await todoInput.vm.$emit('add-todo', 'Think of a 4th item for the todo list'); // 4

        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('toggle', 1);
        await items[2].vm.$emit('toggle', 3);

        // Act
        await wrapper.findByDataTest('filter-all').trigger('click');

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(4);
    });

    it('should show completed todo items when filter is set to completed', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Buy milk at the market'); // 1 
        await todoInput.vm.$emit('add-todo', 'Complete assignment Codebook'); // 2
        await todoInput.vm.$emit('add-todo', 'Push changes to remote'); // 3
        await todoInput.vm.$emit('add-todo', 'Think of a 4th item for the todo list'); // 4

        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('toggle', 1);
        await items[2].vm.$emit('toggle', 3);

        // Act
        await wrapper.findByDataTest('filter-completed').trigger('click');

        // Assert
        const filteredItems = wrapper.findAllComponents(TodoItem);
        expect(filteredItems).toHaveLength(2);
        expect(filteredItems[0].props('todo')).toStrictEqual({id: 1, text: 'Buy milk at the market', completed: true});
        expect(filteredItems[1].props('todo')).toStrictEqual({id: 3, text: 'Push changes to remote', completed: true});
    });

    it('should show non-completed todo items when filter is set to active', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Buy milk at the market'); // 1 
        await todoInput.vm.$emit('add-todo', 'Complete assignment Codebook'); // 2
        await todoInput.vm.$emit('add-todo', 'Push changes to remote'); // 3
        await todoInput.vm.$emit('add-todo', 'Think of a 4th item for the todo list'); // 4

        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('toggle', 1);
        await items[2].vm.$emit('toggle', 3);

        // Act
        await wrapper.findByDataTest('filter-active').trigger('click');

        // Assert
        const filteredItems = wrapper.findAllComponents(TodoItem);
        expect(filteredItems).toHaveLength(2);
        expect(filteredItems[0].props('todo')).toStrictEqual({id: 2, text: 'Complete assignment Codebook', completed: false});
        expect(filteredItems[1].props('todo')).toStrictEqual({id: 4, text: 'Think of a 4th item for the todo list', completed: false});
    });

    it('should show no results message when no items are in chosen filter', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Buy milk at the market'); // 1 
        await todoInput.vm.$emit('add-todo', 'Complete assignment Codebook'); // 2

        // Act
        await wrapper.findByDataTest('filter-completed').trigger('click');

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(0);
        expect(wrapper.findByDataTest('no-results').exists()).toBe(true);

        // Act
        await wrapper.findByDataTest('filter-active').trigger('click'); // swap to active
        const activeItems = wrapper.findAllComponents(TodoItem);
        await activeItems[0].vm.$emit('toggle', 1); // complete all items
        await activeItems[1].vm.$emit('toggle', 2);

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(0);
        expect(wrapper.findByDataTest('no-results').exists()).toBe(true);
    });

    it('should delete all completed todo items when clear-button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Buy milk at the market'); // 1 
        await todoInput.vm.$emit('add-todo', 'Complete assignment Codebook'); // 2
        await todoInput.vm.$emit('add-todo', 'Push changes to remote'); // 3
        await todoInput.vm.$emit('add-todo', 'Think of a 4th item for the todo list'); // 4

        const items = wrapper.findAllComponents(TodoItem);
        await items[0].vm.$emit('toggle', 1);
        await items[2].vm.$emit('toggle', 3);

        // Act
        await wrapper.findByDataTest('clear-completed').trigger('click');

        // Assert
        const filteredItems = wrapper.findAllComponents(TodoItem);
        expect(filteredItems).toHaveLength(2);
        expect(filteredItems[0].props('todo')).toStrictEqual({id: 2, text: 'Complete assignment Codebook', completed: false});
        expect(filteredItems[1].props('todo')).toStrictEqual({id: 4, text: 'Think of a 4th item for the todo list', completed: false});
    });

    it('should show the correct count of active todo items', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Buy milk at the market'); // 1 
        await todoInput.vm.$emit('add-todo', 'Complete assignment Codebook'); // 2

        const items = wrapper.findAllComponents(TodoItem);

        // Act & Assert
        expect(wrapper.findByDataTest('active-count').text()).toBe('2 taken over');

        await items[0].vm.$emit('toggle', 1);
        expect(wrapper.findByDataTest('active-count').text()).toBe('1 taak over');

        await items[1].vm.$emit('toggle', 2);
        expect(wrapper.findByDataTest('active-count').text()).toBe('0 taken over');
    });

});