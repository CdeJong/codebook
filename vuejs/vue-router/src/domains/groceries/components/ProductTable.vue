<script setup>
import { computed } from 'vue';
import { formatCurrency } from '@/util/CurrencyUtil.js';
import ProductRow from '@/domains/groceries/components/ProductRow.vue';


const initialValue = 0;

// props are not allowed to be mutated, when used in a v-for as props.products[index] its seen as an mutation, so switched to a model.
// const props = defineProps({
//     products: Array
// });
const products = defineModel();

const total = computed(() => {
	const value = products.value.reduce(
		(accumulator, product) => accumulator + product.amount * product.price,
		initialValue
	);
	return formatCurrency(value);
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

<style scoped>
table {
    border-collapse: collapse;
	width: min(600px, 100%);
}

th, td {
    /* min-width: 100px; */
    padding: 10px;
    text-align: left;
}

thead tr {
    border-bottom: 3px double #888;
}

.numeric {
    text-align: right;
}

.bold {
    font-weight: bold;
}

</style>
