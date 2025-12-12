<script setup lang="ts">
import ProductForm from '@/domain/product/component/ProductForm.vue';
import { addProduct } from '@/domain/product/store.ts';
import { useRouter, type Router } from 'vue-router';
import { type NewProduct } from '@/domain/product/model/product';

const router : Router = useRouter();

const submit = (product : NewProduct) : void => {
    addProduct(product);
    router.push('/overview');
}
</script>

<template>
    <h1 class="title">Add a product to your shopping list!</h1>
    <ProductForm @submit="submit" clearOnSubmit submitButtonText="Add" />
</template>

<style scoped></style>