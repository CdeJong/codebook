<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '@/domains/books/components/Form.vue';
import { fetchBooks, getBookById, updateBook } from '@/domains/books/store';
import { BookFormData } from '@/domains/books/book';

const route = useRoute();
const router = useRouter();

fetchBooks();

const params = route.params.id;
const bookId = parseInt(Array.isArray(params) ? params[0] : params);
const book = getBookById(bookId);

const handleSubmit = async (data : BookFormData) => {
    await updateBook(bookId, data);
    router.push({ name: 'books.index' });
};

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Boek aanpassen</h1>
        </div>
    </div>

    <Form v-if="book" :book="book" @submit="handleSubmit" />

</template>