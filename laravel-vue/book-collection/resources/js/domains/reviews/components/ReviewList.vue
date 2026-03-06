<script setup lang="ts">
import ReviewComponent from '@/domains/reviews/components/ReviewComponent.vue';
import { Review } from '@/domains/reviews/review';

const reviews = defineModel<Review[]>({required: true});

</script>

<template>
<div class="reviews">
    <h3 class="title">Reviews ({{ reviews.length }})</h3>
    <ReviewComponent v-for="(review, index) in reviews" :key="review.id" :review="reviews[index]" />
</div>
</template>

<style scoped>
.title {
    margin: 0.5em 0;
    font-size: 1.1em;    
}
</style>