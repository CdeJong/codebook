<script setup>
defineProps({
    message: String
});

const emit = defineEmits(['updateMessage']);

const update = () => {
    emit('updateMessage', 'Updated!')
}
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="update()">Update</button>
</template>

<style scoped></style>