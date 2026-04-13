<script setup lang="ts">
import CategoryRow from '@/domains/categories/components/CategoryRow.vue';
import { Category } from '@/domains/categories/category';

const categories = defineModel<Category[]>();

</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th class="id"></th>
                <th>Name</th>
                <th colspan="2"></th>
            </tr>
        </thead>
        <tbody v-if="categories && categories.length > 0">
            <CategoryRow v-for="category, index in categories" :key="category.id" v-model="categories[index]" />
        </tbody>
        <tbody v-else>
            <tr>
                <td class="id"></td>
                <td colspan=3>No Categories found...</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

.table .id {
    min-width: 20px;
}
</style>