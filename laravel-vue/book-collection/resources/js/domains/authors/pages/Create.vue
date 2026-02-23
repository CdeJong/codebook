<script setup lang="ts">
import { ref } from 'vue';
import Form from '@/domains/authors/components/Form.vue';
import { useRouter } from 'vue-router';
import { AuthorFormData } from '@/domains/authors/author';
import { createAuthor } from '@/domains/authors/store';

const router = useRouter();

const author = ref<AuthorFormData>({
    first_name: '',
    last_name: ''
});

const handleSubmit = async (data : AuthorFormData) : Promise<void> => {
    await createAuthor(data);
    router.push({name: 'authors.index'});
};

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Auteur toevoegen</h1>
        </div>
    </div>

    <Form :author="author" @submit="handleSubmit" />

</template>