<script setup>
import { ref } from 'vue';
import ProductTable from '@/components/ProductTable.vue';

const products = ref([
	{name: "Brood", 		price: 1.00, amount: 0},
	{name: "Broccoli", 		price: 0.99, amount: 0},
	{name: "Krentebollen", 	price: 1.20, amount: 0},
	{name: "Noten", 		price: 2.99, amount: 0}
]);

</script>

<template>
	<ProductTable v-model="products" />
</template>

<style scoped></style>
