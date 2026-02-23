<script setup lang="ts">
import { ref } from 'vue';
import { fetchAuthors, getAllAuthors } from '@/domains/authors/store';
import { BookFormData } from '@/domains/books/book';

fetchAuthors();

const props = defineProps(['book']);
const emit = defineEmits(['submit']);
const form = ref<BookFormData>({ ...props.book });

const handleSubmit = () => {
    emit('submit', form.value);
}
</script>


<template>
    <form class="form" @submit.prevent="handleSubmit">
        <label for="title">Titel</label>
        <input type="text" id="title" v-model="form.title">
        <label for="description">Beschrijving</label>
        <textarea id="description" v-model="form.description"></textarea>
        <label for="author">Auteur</label>
        <select id="author" v-model="form.author_id" required>
            <option v-for="author in getAllAuthors" :key="author.id" :value="author.id" :selected="form.author_id == author.id">
                {{ author.first_name }}  {{ author.last_name }}
            </option>
        </select>

        <button class="button" type="submit">Opslaan</button>
    </form>
</template>