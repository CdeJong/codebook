<script setup>
import ProductForm from '@/domains/groceries/components/ProductForm.vue';
import { addGrocery } from '@/domains/groceries/store';

</script>

<template>
    <h1>Create</h1>
    <ProductForm @submit="addGrocery" />
</template>

<style scoped></style>
