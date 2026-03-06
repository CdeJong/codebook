<script setup lang="ts">
import { ref } from 'vue';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';
import { Review } from '@/domains/reviews/review';

const props = defineProps(['review']);
const emit = defineEmits(['submit']);
const review = ref<Review>({ ...props.review });

const handleSubmit = () => {
    emit('submit', {...review.value});
    review.value.comment = '';
    review.value.rating = 0;
}

const zeroRatingElement = ref<HTMLInputElement | null>(null);

const clickStar = (rating : number) => {
    if (review.value.rating === rating) {
        review.value.rating = 0;
        if (zeroRatingElement.value) {
            zeroRatingElement.value.checked = true;
        }
    }
}
</script>


<template>

    <form class="form" @submit.prevent="handleSubmit">
        <FormMessage />

        <label for="rating">Rating:</label>
        <div class="review-rating">
            <input class="hidden" v-model="review.rating" ref="zeroRatingElement" type="radio" name="rating" value="0" :checked="review.rating === 0" />
            <span class="star-wrapper" v-for="number in 5" :key="number">
                <input v-model="review.rating" @click="clickStar(number)" type="radio" name="rating" :value="number" :id="'star' + number" :checked="review.rating === number" />
                <label class="star" :for="'star' + number">★</label>
            </span>
        </div>
        <FormError name="rating" />

        <label for="comment">Commentaar:</label>
        <textarea id="comment" v-model="review.comment"></textarea>
        <FormError name="comment" />

        <button class="button" type="submit">Plaats Review</button>
    </form>
</template>

<style scoped>
.review-rating {
    display: flex;
    margin-left: 0.5em;
}

.review-rating .star {
    font-size: 2em;
    color: rgb(184, 184, 184);
    transition: color 0.2s;
    padding: 0;
}

.review-rating .active {
    color: gold;
}

/* ye not fully happy with this either :P */
.review-rating .hidden {
    opacity: 0;
    position: absolute;
}

.star-wrapper {
    position: relative;
}

.star-wrapper input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
}

.star-wrapper input:checked + label, 
.star-wrapper:has(~ .star-wrapper input:checked) label {    
    color: gold !important;
}

.star-wrapper input:hover + label,
.star-wrapper:has(~ .star-wrapper input:hover) label {
  color: aqua;
} 
</style>