<script setup lang="ts">
import { showNotice } from '@/services/dialog';
import { Category } from '@/domains/categories/category';
import { categoryStore } from '@/domains/categories/store';
import { destroyMessage, getMessage } from '@/services/error';

const category = defineModel<Category>({ required: true});

const handleDelete = () => {
    categoryStore.actions.delete(category.value).catch(_ => {
        // delete failed, error message is obtained from an external system...
        showNotice("Oops! You cannot do this!", getMessage.value, () => destroyMessage());
    });
}

</script>

<template>
<tr>
    <td class="id">#{{ category.id }}</td>
    <td class="long" :title="category.name">{{ category.name }}</td>
    <td><RouterLink class="button" :to="{ name: 'categories.edit', params: { id: category.id }}">Edit</RouterLink></td>
    <td><button class="button delete" @click.prevent="handleDelete">Delete</button></td>
</tr>
</template>

<style scoped>

.id {
    min-width: 20px;
    text-align: right;
}

</style>