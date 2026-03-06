<script setup lang="ts">
import { ref } from 'vue';
import { authorStore } from '@/domains/authors/store';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';
import { Book } from '@/domains/books/book';

authorStore.actions.fetchAll();

const props = defineProps(['book']);
const emit = defineEmits(['submit']);
const form = ref<Book>({ ...props.book });

const handleSubmit = () => {
    emit('submit', form.value);
}

// vue starts crying when I immidiately use this in the v-for :/
const authors = authorStore.getters.getAll();
</script>


<template>

    <form class="form" @submit.prevent="handleSubmit">
        <FormMessage />

        <label for="title">Titel:</label>
        <input type="text" id="title" v-model="form.title">
        <FormError name="title" />

        <label for="description">Beschrijving:</label>
        <textarea id="description" v-model="form.description"></textarea>
        <FormError name="description" />

        <label for="author">Auteur:</label>
        <select id="author" v-model="form.author_id" required>
            <option v-for="author in authors" :key="author.id" :value="author.id" :selected="form.author_id == author.id">
                {{ author.first_name }} {{ author.last_name }}
            </option>
        </select>
        <FormError name="author_id" />

        <button class="button" type="submit">Opslaan</button>
    </form>
</template>