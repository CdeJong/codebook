<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { bookStore } from '@/domains/books/store';
import { reviewStore } from '@/domains/reviews/store';
import Form from '@/domains/reviews/components/Form.vue';
import { Review } from '@/domains/reviews/review';
import ReviewList from '@/domains/reviews/components/ReviewList.vue';

const route = useRoute();

bookStore.actions.fetchAll();
reviewStore.actions.fetchAll();

const params = route.params.id;
const bookId = parseInt(Array.isArray(params) ? params[0] : params);
const book = bookStore.getters.getById(bookId);

const reviews = reviewStore.getters.getByBookId(bookId);


const review = ref<Review>({
    id: NaN,
    book_id: bookId,
    rating: 0,
    comment: ''
});

const handleCreate = async (review: Review) => {
    await reviewStore.actions.create(review);
}

</script>


<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Book: {{ book?.title ?? "loading..." }}</h1>
        </div>
        <div class="secondary-header">
            <p class="title">Written by {{ book?.author?.first_name ?? "loading..." }} {{ book?.author?.last_name }}</p> 
        </div>
    </div>

    <div class="page-content">
        <p>{{ book?.description }}</p>
    </div>

    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Post a review for this book!</h1>
        </div>
    </div>

    <Form :review="review" @submit="handleCreate" />

    <ReviewList v-model="reviews" />

</template>

<style scoped>
.page-content {
    min-height: 250px;
}
</style>