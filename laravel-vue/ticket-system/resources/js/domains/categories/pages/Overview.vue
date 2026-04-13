<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CategoryTable from '@/domains/categories/components/CategoryTable.vue';
import { categoryStore } from '../store';

categoryStore.actions.fetchAll();

const sortedCategories = computed(() => {
    const categories = categoryStore.getters.getAll();

    if (!categories.value) {
        return [];
    }

    return categories.value.sort((category1, category2) => category1.name.localeCompare(category2.name, 'en-US') );

});

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Category Overview</h1>
            <RouterLink class="button" :to="{ name: 'categories.create' }">Create New Category</RouterLink>
        </div>
    </div>

    <CategoryTable v-model="sortedCategories" />

</template>