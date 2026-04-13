<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { categoryStore } from '@/domains/categories/store';
import CategoryForm from '@/domains/categories/components/CategoryForm.vue';
import { Category } from '../category';

const router = useRouter();
const route = useRoute();
const id = +route.params.id;

if (!isNaN(id)) {
    categoryStore.actions.fetchAll();
}

const category = categoryStore.getters.getById(id);

const handleSubmit = async (newCategory : Category) => {
    await categoryStore.actions.update(category.value.id, newCategory);
    router.push({ name: 'categories.index' });
}

</script>

<template>

    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Edit Category: {{ category?.name ?? '' }}</h1>
        </div>
    </div>

    <CategoryForm v-if="category" :category="category" @submit="handleSubmit" />

</template>