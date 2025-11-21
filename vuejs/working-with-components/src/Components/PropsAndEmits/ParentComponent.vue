<script setup>
import { ref } from 'vue';
import ChildComponent from './PropsAndEmits/ChildComponent.vue';

const message = ref('Hello World');

const handleUpdate = (newMessage) => {
    message.value = newMessage;
};
</script>

<template>
    <ChildComponent :message=message @updateMessage="handleUpdate" />
</template>

<style scoped></style>
