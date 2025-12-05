<script setup>
import ProductForm from '@/domains/groceries/components/ProductForm.vue';
import { getGroceryById, updateGrocery, deleteGrocery } from '@/domains/groceries/store.js';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const product = getGroceryById(route.params.id);

const onClickDelete = () => {
    deleteGrocery(product.value.id);
    router.push('/overview');
};

</script>

<template>
    <h1 class="title">Edit product: {{ product ? product.name : "Could not find this product!" }}</h1>

    <ProductForm v-if="product != null" @submit="updateGrocery" :product="product" submitButtonText="Save" />
    <p v-else>Unknown Grocery Id</p>

    <div v-if="product != null" class="delete">
        <p>Delete this product from your shopping list!</p>
        <button @click="onClickDelete()" class="button">Delete</button>
    </div>
    
</template>

<style scoped>
p {
    padding: 0px 5px;
}

.delete p {
    padding: 10px 5px;
}

button {
    padding: 5px 10px;
    display: block;
    background-color: red;
    border: none;
    border-radius: 5px;
    min-width: 100px;
}

button:hover {
    color: white;
}
</style>
