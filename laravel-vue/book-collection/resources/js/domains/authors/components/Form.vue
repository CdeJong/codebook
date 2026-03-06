<script setup lang="ts">
import { ref } from 'vue';
import { Author } from '@/domains/authors/author';
import FormMessage from '@/services/error/FormMessage.vue';
import FormError from '@/services/error/FormError.vue';


const props = defineProps(['author']);
const emit = defineEmits(['submit']);
const form = ref<Author>({ ...props.author });

const handleSubmit = () => emit('submit', form.value);

</script>

<template>

    <FormMessage />

    <form class="form" @submit.prevent="handleSubmit">
        <label for="first_name">Voornaam</label>
        <input type="text" id="first_name" v-model="form.first_name">
        <FormError name="first_name" />

        <label for="first_name">Achternaam</label>
        <input type="text" id="last_name" v-model="form.last_name">
        <FormError name="last_name" />

        <button class="button" type="submit">Opslaan</button>
    </form>
</template>