<script setup>
import {reactive, ref} from 'vue';

const clicks = ref(0);
const person = reactive({
  firstName: '',
  country: ''
});

const increaseClicks = () => {
  clicks.value++;
}

const changeCountry = (newCountry) => {
  person.country = newCountry;
}

</script>

<template>
    <button @click="increaseClicks">Click me!</button>
    <button @click="changeCountry('Nederland')">Nederland</button>
    <button @click="changeCountry('België')">België</button>
    <input type="text" v-model="person.firstName" placeholder="First name" />
    <p>Clicks: {{ clicks }}</p>
    <p>First Name: {{ person.firstName }}</p>
    <p>Country: {{ person.country }}</p>
</template>

<style scoped></style>
