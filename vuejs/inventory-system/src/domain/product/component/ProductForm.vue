<script setup lang="ts">
import { ref } from 'vue';
import { type Product } from '@/domain/product/model/product';

const emit = defineEmits(["submit"]);

const {product} = defineProps<{product: Product}>()

const copyProduct = ref({...product});

const submit = () : void => {
    emit("submit", copyProduct.value);
}
</script>

<template>
    <form @submit.prevent="submit()">
        <label for="name">Name:</label>
        <input id="name" type="text" placeholder="Bread" required v-model="copyProduct.name">

        <label for="amount">Amount:</label>
        <input id="amount" type="number" min="0" placeholder="0" v-model="copyProduct.amount">

        <label for="minimum-amount">Minimum Amount:</label>
        <input id="minimum-amount" type="number" min="0" placeholder="0" v-model="copyProduct.minimumAmount">

        <button type="submit">Save</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: min(600px, 100%);
}

input {
    border: none;
    border-bottom: 1px solid black;
}

input {
    margin-bottom: 10px;
}

input, label, button {
    padding: 5px 10px;
}

button {
    align-self: flex-start;
    background-color: aqua;
    border: none;
    border-radius: 5px;
    min-width: 100px;
}

button:hover {
    color: white;
}    
</style>