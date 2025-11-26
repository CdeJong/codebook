<script setup>
import { computed, ref } from 'vue';

const currencyFormatter = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR"});

const products = ref([
	{name: "Brood", 		price: 1.00, amount: 0},
	{name: "Broccoli", 		price: 0.99, amount: 0},
	{name: "Krentebollen", 	price: 1.20, amount: 0},
	{name: "Noten", 		price: 2.99, amount: 0}
]);

const subtotal = (product) => {
	return formatPrice(product.price * product.amount);
}

const formatPrice = (number) => {
	return currencyFormatter.format(number);
}

const total = computed(() => {
	const value = products.value.reduce((accumulator, product) => accumulator + product.amount * product.price, 0);
	return formatPrice(value);
});

</script>

<template>
	<table>
		<thead>
			<tr>
				<th>Product</th>
				<th>Prijs</th>
				<th>Aantal</th>
				<th>Subtotaal</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(product, index) in products" :key="index">
				<td>{{ product.name }}</td>
				<td class="numeric">{{ formatPrice(product.price) }}</td>
				<td><input type="number" min="0" v-model="product.amount"></td>
				<td class="numeric">{{ subtotal(product) }}</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3" class="bold">Totaal</td>
				<td class="numeric bold">{{ total }}</td>
			</tr>
		</tfoot>
	</table>
</template>

<style scoped></style>
