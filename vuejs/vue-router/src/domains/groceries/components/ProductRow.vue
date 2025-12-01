<script setup>
import { computed } from 'vue';

import { formatCurrency } from '@/util/CurrencyUtil.js';

const product = defineModel();

const subtotal = computed(() => {
	return formatCurrency(product.value.price * product.value.amount);
});


</script>

<template>
    <tr>
        <td>{{ product.name }}</td>
        <td class="numeric">{{ formatCurrency(product.price) }}</td>
        <td><input type="number" min="0" v-model="product.amount"></td>
        <td class="numeric">{{ subtotal }}</td>
	</tr>
</template>

<style scoped>
td {
    min-width: 100px;
    padding: 10px;
    text-align: left;
}

input {
    padding: 0;
    border: none;
}

tr {
    border-bottom: 1px solid #888;
}

.numeric {
    text-align: right;
}
</style>