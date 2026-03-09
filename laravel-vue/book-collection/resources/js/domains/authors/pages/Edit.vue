<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '@/domains/authors/components/Form.vue';
import { authorStore } from '@/domains/authors/store';
import { Author } from '@/domains/authors/author';

const route = useRoute();
const router = useRouter();

authorStore.actions.fetchAll();

const authorId = +route.params.id
// const params = route.params.id;
// const authorId = parseInt(Array.isArray(params) ? params[0] : params);
const author = authorStore.getters.getById(authorId);

const handleSubmit = async (data : Author) => {
    await authorStore.actions.update(authorId, data);
    router.push({ name: 'authors.index' });
};
</script>

<template>
    <div class="content-header"> 
        <div class="primary-header">
            <h1 class="title">Auteur aanpassen</h1>
        </div>
    </div>

    <Form v-if="author" :author="author" @submit="handleSubmit" />
</template>