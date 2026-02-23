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

    console.log(data);

    await createBook(data);
    router.push({name: 'books.index'});
};
</script>


<template>
    <h1>Create New Book</h1>
    <Form :book="book" @submit="handleSubmit" />
</template>