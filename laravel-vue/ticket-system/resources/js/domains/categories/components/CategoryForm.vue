<script setup lang="ts">
import { Category } from '@/domains/categories/category';
import { ref } from 'vue';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';

const props = defineProps(['category']);
const emit = defineEmits(['submit']);
const form = ref<Category>({ ...props.category });  

const handleSubmit = () => {
    emit('submit', form.value);
}
</script>

<template>
<form class="form" @submit.prevent="handleSubmit">
    <FormMessage />

    <label for="name">Name:</label>
    <input type="text" id="name" v-model="form.name" required>
    <FormError name="name" />

    <button class="button" type="submit">Save</button>
</form>
</template>