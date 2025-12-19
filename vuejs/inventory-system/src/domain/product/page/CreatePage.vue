<script setup lang="ts">
import ProductForm from '@/domain/product/component/ProductForm.vue';
import { addProduct } from '@/domain/product/store.ts';
import { useRouter, type Router } from 'vue-router';
import { type Product } from '@/domain/product/model/product';

const router : Router = useRouter();

const submit = (product : Product) : void => {
    addProduct(product);
    router.push({ name: 'product.overview' });
}

const product = {
    id: -1,
    name: '',
    amount: 0,
    minimumAmount: 0,
}

</script>

<template>
    <h1 class="title">Add a product to your shopping list!</h1>
    <ProductForm @submit="submit" :product />
</template>

<style scoped></style>