<script setup>
import { ref, computed } from 'vue';
import ProductRow from '@/components/ProductRow.vue';

const currencyFormatter = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR"});

const props = defineProps({
    products: Array
});

const products = ref(props.products);

const total = computed(() => {
	const value = products.value.reduce((accumulator, product) => accumulator + product.amount * product.price, 0);
	return currencyFormatter.format(value);
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
			<!-- For some reason "products[index]" is allowed, but "product" isn't -->
			<ProductRow v-for="(product, index) in products" :key="index" v-model="products[index]" />
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
