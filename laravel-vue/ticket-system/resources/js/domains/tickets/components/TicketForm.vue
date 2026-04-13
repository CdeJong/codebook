<script setup lang="ts">
import { categoryStore } from '@/domains/categories/store';
import { Ticket } from '@/domains/tickets/ticket';
import { ref } from 'vue';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';

const props = defineProps(['ticket']);
const emit = defineEmits(['submit']);
const form = ref<Ticket>({ ...props.ticket });

categoryStore.actions.fetchAll();
const categories = categoryStore.getters.getAll();    

const handleSubmit = () => {
    emit('submit', form.value);
}
</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <FormMessage />

        <label for="title">Titel:</label>
        <input type="text" id="title" v-model="form.title" required>
        <FormError name="title" />

        <label for="content">Content:</label>
        <textarea id="content" v-model="form.content" required></textarea>
        <FormError name="content" />

        <label for="categories">Categories:</label>
        <select name="categories" id="" v-model="form.category_ids" multiple>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
        </select>
        <FormError name="categories" />

        <button class="button" type="submit">Save</button>
    </form>
</template>