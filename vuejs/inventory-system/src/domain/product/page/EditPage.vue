<script setup lang="ts">
import ProductForm from '@/domain/product/component/ProductForm.vue';
import { getProduct, updateProduct, deleteProduct } from '@/domain/product/store.ts';
import { useRoute, useRouter } from 'vue-router';
import type { NewProduct } from '../model/product';

const router = useRouter();
const route = useRoute();
const getProductFromRoute = () => {
	const param = route.params.id;
	
	if (param == undefined || Array.isArray(param)) {
		return undefined;
	}

	const id = parseInt(param);
	return getProduct(id);
}
const product = getProductFromRoute();

const onClickDelete = () => {
	if (product == undefined) {
		return;
	}
    deleteProduct(product.id);
    router.push('/overview');
};

const submit = (newProduct : NewProduct) => {
	if (product == undefined) {
		return;
	}
	updateProduct({id: product.id, ...newProduct});
    // a pop-up with "Saved" would be nicer, but that would more be a "COULD" priority, and user story says to redirect, so its fine for now!
	router.push('/overview'); 
}

</script>

<template>
    <h1 class="title">Edit product: {{ product ? product.name : "Could not find this product!" }}</h1>

    <ProductForm v-if="product != null" @submit="submit" :product="product" submitButtonText="Save" />
    <p v-else>Unknown Product Id</p>

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
