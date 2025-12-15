<script setup lang="ts">
import { reactive } from 'vue';
import { type NewProduct } from '@/domain/product/model/product';

const emit = defineEmits(["submit"]);

interface Props {
    product? : NewProduct,
    clearOnSubmit?: boolean,
    submitButtonText?: string
}

const props = withDefaults(defineProps<Props>(), {
    product: () => ({name: '', amount: 0, minimumAmount: 0}), 
    clearOnSubmit: false, 
    submitButtonText: 'Submit' 
})
const product : NewProduct = reactive({...props.product});

const submit = () : void => {
    emit("submit", {...product});
    if (props.clearOnSubmit) {
        product.name = '';
        product.minimumAmount = 0;
        product.amount = 0;
    }
}
</script>

<template>
    <form @submit.prevent="submit()">
        <label for="name">Name:</label>
        <input id="name" type="text" placeholder="Bread" required v-model="product.name">

        <label for="amount">Amount:</label>
        <input id="amount" type="number" min="0" placeholder="0" v-model="product.amount">

        <label for="minimum-amount">Minimum Amount:</label>
        <input id="minimum-amount" type="number" min="0" placeholder="0" v-model="product.minimumAmount">

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