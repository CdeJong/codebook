<script setup>
import { computed } from 'vue';

import { formatCurrency } from '@/util/CurrencyUtil.js';
import { deleteGrocery } from '../store';

const product = defineModel();

const subtotal = computed(() => {
	return formatCurrency(product.value.price * product.value.amount);
});

const editUrl = computed(() => "/edit/" + product.value.id)


</script>

<template>
    <RouterLink :to="editUrl" custom v-slot="{ navigate }">
        <tr @click="navigate">
            <td class="padding">{{ product.name }}</td>
            <td class="padding numeric">{{ formatCurrency(product.price) }}</td>
            <td class="padding"><input type="number" min="0" v-model="product.amount" @click.stop @mousedown.stop /></td>
            <td class="padding numeric">{{ subtotal }}</td>
            <td><button class="edit" >Edit</button></td>
            <td><button class="delete" @click.stop="deleteGrocery(product.id)">Delete</button></td>
        </tr>
    </RouterLink>
</template>

<style scoped>

.padding {
    padding: 10px;
}

td {
    /* min-width: 100px; */
    text-align: left;
    padding: 0 5px;
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

button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
}

.edit {
    background-color: aqua;
}

.edit:hover {
    color: white;
}

.delete {
    background-color: red;
}

.delete:hover {
    color: white;
}

</style>