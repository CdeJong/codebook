<script setup>
import { ref } from 'vue';
import ChildComponent from '@/Components/Model/ChildComponent.vue';

const message1 = ref('');
const message2 = ref('');
const message3 = ref('');
</script>

<template>
    <ChildComponent v-model="message1" />
    <ChildComponent v-model="message2" />
    <ChildComponent v-model="message3" />
    <h1>{{ message1 }}</h1>
    <h1>{{ message2 }}</h1>
    <h1>{{ message3 }}</h1>
</template>

<style scoped></style>