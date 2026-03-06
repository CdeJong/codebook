<script setup lang="ts">
import { ref } from 'vue';
import Form from '@/domains/authors/components/Form.vue';
import { useRouter } from 'vue-router';
import { Author } from '@/domains/authors/author';
import { authorStore } from '@/domains/authors/store';

const router = useRouter();

const author = ref<Author>({
    id: NaN,
    first_name: '',
    last_name: ''
});

const handleSubmit = async (data : Author) : Promise<void> => {
    await authorStore.actions.create(data);
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