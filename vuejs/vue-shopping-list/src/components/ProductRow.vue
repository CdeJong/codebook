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