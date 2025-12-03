<script setup>
import ProductTable from '@/domains/groceries/components/ProductTable.vue';
import { getAllGroceries } from '@/domains/groceries/store.js';

</script>

<template>
    <h1 class="title">Overview</h1>
    <ProductTable v-model="getAllGroceries" />
</template>

<style scoped></style>
