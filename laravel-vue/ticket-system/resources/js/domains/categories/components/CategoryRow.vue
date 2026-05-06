<script setup lang="ts">
import { useDialog } from '@/services/dialog';
import { Category } from '@/domains/categories/category';
import { categoryStore } from '@/domains/categories/store';

const dialog = useDialog();
const category = defineModel<Category>({ required: true});

const handleDelete = async () => {
    try {
        await categoryStore.actions.delete(category.value);
    } catch (error : any) {
        const message = error.response.data.message ?? "Something went wrong, but no error message was provided!";
        dialog.show({ 
            title: 'Oops! Something went wrong!', 
            description: message,
            buttons: [{ text: 'Ok' }],
            style: 'danger'
        });
    }
}

</script>

<template>
<tr>
    <td class="id">#{{ category.id }}</td>
    <td class="long" :title="category.name">{{ category.name }}</td>
    <td><RouterLink class="button" :to="{ name: 'categories.edit', params: { id: category.id }}">Edit</RouterLink></td>
    <td><button class="button danger" @click.prevent="handleDelete">Delete</button></td>
</tr>
</template>

<style scoped>

.id {
    min-width: 20px;
    text-align: right;
}

</style>