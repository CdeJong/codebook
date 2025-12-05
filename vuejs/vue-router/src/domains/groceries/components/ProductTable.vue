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
	<div class="table-wrapper">
		<table>
			<thead>
				<tr>
					<th>Product</th>
					<th>Prijs</th>
					<th>Aantal</th>
					<th>Subtotaal</th>
					<th colspan="2" ></th>
				</tr>
			</thead>
			<tbody>
				<ProductRow v-for="(_, index) in products" :key="index" v-model="products[index]" />
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3" class="bold">Totaal</td>
					<td class="numeric bold">{{ total }}</td>
					<td colspan="2"></td>
				</tr>
			</tfoot>
		</table>
	</div>

	
</template>

<style scoped>
.table-wrapper {
	width: 100%;
	max-width: 100%;
	overflow-x: auto;
}

table {
    border-collapse: collapse;
	min-width: max-content;
	margin-bottom: 10px;
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
