<script setup>
import ProductForm from '@/domains/groceries/components/ProductForm.vue';
import { addGrocery } from '@/domains/groceries/store';
import { useRouter } from 'vue-router';

const router = useRouter();

const submit = (grocery) => {
    addGrocery(grocery);
    router.push('/overview');
}

</script>

<template>
    <h1 class="title">Add a product to your shopping list!</h1>
    <ProductForm @submit="submit" clearOnSubmit submitButtonText="Add" />
</template>

<style scoped></style>
