<script setup lang="ts">
import { ref } from 'vue';
import { AuthorFormData } from '@/domains/authors/author';


const props = defineProps(['author']);
const emit = defineEmits(['submit']);
const form = ref<AuthorFormData>({ ...props.author });

const handleSubmit = () => {
    emit('submit', form.value);
}
</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <label for="first_name">Voornaam</label>
        <input type="text" id="first_name" v-model="form.first_name">

        <label for="first_name">Achternaam</label>
        <input type="text" id="last_name" v-model="form.last_name">
    
        <button class="button" type="submit">Opslaan</button>
    </form>
</template>