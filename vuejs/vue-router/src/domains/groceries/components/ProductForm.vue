<script setup>
import { reactive } from 'vue';

const emit = defineEmits(["submit"]);

const props = defineProps({
     product: { type: Object, default: () => {
        return {name: '', price: 0, amount: 0}
    }}
});

let product = reactive({...props.product});

const submit = () => {
    emit("submit", product);
}
</script>

<!-- todo find a way to clear the form without affecting the reference -->
<template>
    <form @submit.prevent="submit()">
        <label for="name">Name:</label>
        <input type="text" placeholder="Bread" required v-model="product.name">

        <label for="name">Price:</label>
        <input type="text" placeholder="1.99" required v-model.number="product.price">

        <label for="name">Amount:</label>
        <input type="number" min="0" placeholder="0" v-model="product.amount">

        <button type="submit">Save</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-content: start;
}

input {
    border: none;
    border-bottom: 1px solid black;
}

label, button {
    margin-top: 10px;
}

input, label, button {
    padding: 5px 10px;
}

button {
    background-color: aqua;
    border: none;
    border-radius: 5px;
}

button:hover {
    color: white;
}


</style>