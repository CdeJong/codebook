<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '@/domains/authors/components/Form.vue';
import { fetchAuthors, getAuthorById, updateAuthor } from '@/domains/authors/store';
import { AuthorFormData } from '@/domains/authors/author';

const route = useRoute();
const router = useRouter();

fetchAuthors();

const params = route.params.id;
const authorId = parseInt(Array.isArray(params) ? params[0] : params);
const author = getAuthorById(authorId);

const handleSubmit = async (data : AuthorFormData) => {
    await updateAuthor(authorId, data);
    router.push({ name: 'authors.index' });
};
</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Auteur aanpassen</h1>
        </div>
    </div>

    <Form :author="author" @submit="handleSubmit" />

</template>