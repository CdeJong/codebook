<script setup>
import { reactive } from 'vue';

const emit = defineEmits(["submit"]);

const props = defineProps({
     product: { type: Object, default: () => ({name: '', price: '', amount: 0}) },
     clearOnSubmit: { type: Boolean, default: () => false },
     submitButtonText: { type: String, default: () => "Submit" }
});

let product = reactive({...props.product});

const submit = () => {
    emit("submit", {...product});
    if (props.clearOnSubmit) {
        product.name = '';
        product.price = '';
        product.amount = 0;
    }
}
</script>

<template>
    <form @submit.prevent="submit()">
        <label for="name">Name:</label>
        <input type="text" placeholder="Bread" required v-model="product.name">

        <label for="name">Price:</label>
        <input type="text" placeholder="1.99" required v-model.number="product.price">

        <label for="name">Amount:</label>
        <input type="number" min="0" placeholder="0" v-model="product.amount">

        <button type="submit">{{ props.submitButtonText }}</button>
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
    /* width: 100%; */
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