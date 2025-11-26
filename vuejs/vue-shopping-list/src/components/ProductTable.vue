<script setup>
import { ref, computed } from 'vue';
import ProductRow from '@/components/ProductRow.vue';

const initialValue = 0;
const currencyFormatter = new Intl.NumberFormat("nl-NL", {
	style: "currency", 
	currency: "EUR"
});

const props = defineProps({
    products: Array
});

const total = computed(() => {
	const value = props.products.reduce(
		(accumulator, product) => accumulator + product.amount * product.price, 
		initialValue
	);
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
			<ProductRow 
				v-for="(product, index) in props.products" 
				:key="index" 
				v-model="props.products[index]" 
			/>
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
