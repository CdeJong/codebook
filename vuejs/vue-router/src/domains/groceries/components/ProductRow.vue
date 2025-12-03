<script setup>
import { computed } from 'vue';

import { formatCurrency } from '@/util/CurrencyUtil.js';

const product = defineModel();

const subtotal = computed(() => {
	return formatCurrency(product.value.price * product.value.amount);
});

const editUrl = computed(() => "/edit/" + product.value.id)


</script>

<template>
    <RouterLink :to="editUrl" custom v-slot="{ navigate }">
        <tr @click="navigate">
            <td>{{ product.name }}</td>
            <td class="numeric">{{ formatCurrency(product.price) }}</td>
            <td><input type="number" min="0" v-model="product.amount" @click.stop @mousedown.stop /></td>
            <td class="numeric">{{ subtotal }}</td>
        </tr>
    </RouterLink>
</template>

<style scoped>

td {
    /* min-width: 100px; */
    padding: 10px;
    text-align: left;
}

input {
    padding: 0;
    border: none;
}

tr {
    border-bottom: 1px solid #888;
    display: table-row;
}

tr:hover,
tr:hover input {
    background-color: aquamarine;
}

.numeric {
    text-align: right;
}
</style>