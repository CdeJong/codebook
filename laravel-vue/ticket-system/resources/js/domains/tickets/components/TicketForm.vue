<script setup lang="ts">
import { categoryStore } from '@/domains/categories/store';
import { Ticket } from '@/domains/tickets/ticket';
import { ref, watch } from 'vue';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';
import CategorySelect from '@/domains/categories/components/CategorySelect.vue';

const props = defineProps(['ticket']);
const emit = defineEmits(['submit']);
const form = ref<Ticket>({
    ...props.ticket,
    category_ids: [...props.ticket.category_ids]
});
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
        <CategorySelect v-model="form.category_ids" :categories="categories" />
        <FormError name="category_ids" />

        <button class="button" type="submit">Save</button>
    </form>
</template>

<style scoped>
.category-select {
    max-height: 150px;
    overflow: scroll;
}
</style>