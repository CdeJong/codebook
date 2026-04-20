<script setup lang="ts">
import { categoryStore } from '@/domains/categories/store';

const categories = categoryStore.getters.getAll();
const category_ids = defineModel<number[]>();
</script>

<template>
    <label v-for="category in categories" :key="category.id" :for="'category-' + category.id">
        <input type="checkbox" :id="'category-' + category.id" v-model="category_ids" :value="Number(category.id)" />
        <div class="value">{{ category.name }}</div>
    </label>
</template>

<style scoped>

label input {
    width: 25px;
    margin: 0;
}

label {
    display: flex;
    height: 25px;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
}

label .value {
    flex-grow: 1;
}

label:hover {
    background-color: blue;
}

</style>