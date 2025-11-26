<script setup>
import { computed } from 'vue';

const currencyFormatter = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR"});

const product = defineModel();

const subtotal = computed(() => {
	return currencyFormatter.format(product.value.price * product.value.amount);
});

const price = computed(() => {
	return currencyFormatter.format(product.value.price);
});
</script>

<template>
    <tr>
        <td>{{ product.name }}</td>
        <td class="numeric">{{ price }}</td>
        <td><input type="number" min="0" v-model="product.amount"></td>
        <td class="numeric">{{ subtotal }}</td>
	</tr>
</template>