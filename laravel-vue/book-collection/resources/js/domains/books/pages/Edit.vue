<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '@/domains/books/components/Form.vue';
import { bookStore } from '@/domains/books/store';
import { Book } from '@/domains/books/book';

const route = useRoute();
const router = useRouter();

bookStore.actions.fetchAll();

const params = route.params.id;
const bookId = parseInt(Array.isArray(params) ? params[0] : params);
const book = bookStore.getters.getById(bookId);

const handleSubmit = async (data : Book) => {
    await bookStore.actions.update(bookId, data);
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