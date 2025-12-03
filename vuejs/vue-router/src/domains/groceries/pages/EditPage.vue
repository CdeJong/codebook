<script setup>
import ProductForm from '@/domains/groceries/components/ProductForm.vue';
import { getGroceryById, updateGrocery } from '@/domains/groceries/store.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = getGroceryById(route.params.id);

</script>

<template>
    <h1 class="title">Edit product: {{ product.name }}</h1>
    <ProductForm v-if="product != null" @submit="updateGrocery" :product="product" submitButtonText="Save" />
    <p v-else>Unknown Grocery Id</p>
</template>

<style scoped></style>
