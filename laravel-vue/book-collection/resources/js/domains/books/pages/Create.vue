<script setup lang="ts">
import Form from '@/domains/books/components/Form.vue';
import { createBook } from '@/domains/books/store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { BookFormData } from '@/domains/books/book';


const router = useRouter();

const book = ref<BookFormData>({
    title: '',
    description: '',
    author_id: null,
});

const handleSubmit = async (data : BookFormData) : Promise<void> => {
    await createBook(data);
    router.push({name: 'books.index'});
};
</script>


<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Voeg een nieuw boek toe</h1>
        </div>
    </div>

    <Form :book="book" @submit="handleSubmit" />
</template>