<script setup lang="ts">
import { Category } from '@/domains/categories/category';

const props = defineProps<{ categories: Category[] }>();
const category_ids = defineModel<number[]>();

</script>

<template>
<div class="category-select">
    <label v-for="category in props.categories" :key="category.id" :for="'category-' + category.id">
        <input type="checkbox" :id="'category-' + category.id" v-model="category_ids" :value="Number(category.id)" />
        <div class="value">{{ category.name }}</div>
    </label>
</div>
</template>

<style scoped>

label input {
    width: 25px;
    margin: 0;
}

label {
    padding: 0;
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
    background-color: rgb(179, 244, 247);
}

</style>