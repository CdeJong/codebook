<script setup lang="ts">
import { computed } from 'vue';
import { deleteProduct } from '@/domain/product/store.ts';
import { type Product } from '@/domain/product/model/product';

const product = defineModel<Product>({default: () => {}}); // todo fix hacky bypass

const editUrl = computed(() => "/edit/" + product.value.id); // todo is computed needed? id should never change
</script>

<template>
    <RouterLink :to="editUrl" custom v-slot="{ navigate }">
        <tr @click="navigate">
            <td class="padding name" :title=product.name>{{ product.name }}</td>
            <td class="padding"><input type="number" min="0" v-model="product.amount" @click.stop @mousedown.stop /></td>
            <td class="padding">{{ product.minimumAmount }}</td>
            <td><button class="edit" >Edit</button></td>
            <td><button class="delete" @click.stop="deleteProduct(product.id)">Delete</button></td>
        </tr>
    </RouterLink>
</template>

<style scoped>

.padding {
    padding: 10px;
}

.name {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

td {
    text-align: left;
    padding: 0 5px;
}

input {
    padding: 0;
    border: none;
}

tr {
    border-bottom: 1px solid #888;
}

tr:hover,
tr:hover input {
    background-color: aquamarine;
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