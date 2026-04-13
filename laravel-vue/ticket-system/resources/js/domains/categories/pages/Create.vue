<script setup lang="ts">
import CategoryForm from '@/domains/categories/components/CategoryForm.vue';
import { Category } from '@/domains/categories/category';
import { categoryStore } from '@/domains/categories/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const category = ref<Category>({
    id: 0,
    name: ''
});

const handleSubmit = async (category : Category) => {
    await categoryStore.actions.create(category);
    router.push({ name: 'categories.index' });
}

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Create New Category</h1>
        </div>
    </div>

    <CategoryForm :category="category" @submit="handleSubmit" /> 
</template>