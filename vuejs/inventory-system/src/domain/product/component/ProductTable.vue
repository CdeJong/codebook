<script setup lang="ts">
import { type Product } from '@/domain/product/model/product';
import ProductRow from '@/domain/product/component/ProductRow.vue';

const products = defineModel<Product[]>({
    default: () => [] // so its never undefined
});

</script>

<template>
	<div class="table-wrapper">
		<table>
			<thead>
				<tr>
					<th>Product</th>
					<th>Aantal</th>
					<th>Minimum</th>
					<th colspan="2" ></th>
				</tr>
			</thead>
			<tbody>
				<ProductRow v-for="(_, index) in products" :key="index" v-model="products[index]" />
				<tr v-if="products.length == 0" class="no-data">
					<td colspan="3">No Data</td>
					<td colspan="2" ></td>
				</tr>
			</tbody>
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

th {
    padding: 10px;
    text-align: left;
	min-width: 100px;
}

thead tr {
    border-bottom: 3px double #888;
}

.no-data {
	border-bottom: 1px solid #888;
}

.no-data td {
	text-align: center;
	padding: 10px;
}

</style>
