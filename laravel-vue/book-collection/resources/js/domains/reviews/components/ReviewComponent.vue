<script setup lang="ts">
import { Review } from '@/domains/reviews/review';
import { ref } from 'vue';
import { reviewStore } from '@/domains/reviews/store';

const props = defineProps<{ review: Review }>();
const review = ref({ ...props.review });
const isEditting = ref<boolean>(false); 
    
const edit = () => {
    isEditting.value = true;
}

const cancel = () => {
    isEditting.value = false;
} 

const save = () => {
    isEditting.value = false;
    reviewStore.actions.update(review.value.id, review.value)
}

const destroy = () => {
    reviewStore.actions.delete(review.value);
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
<div v-if="!isEditting" class="review" :id="'review-' + review.id">
    <div class="review-header">
        <div class="review-rating">
            <span class="star" v-for="number in 5" :key="number" :class="{ active: review.rating >= number }">★</span>
        </div>
        <div class="spacer"></div>
        <button class="button delete" @click.prevent="destroy">Delete</button>
        <button class="button" @click.prevent="edit">Edit</button>
    </div>
    <div class="review-content">
        <p>{{ review.comment }}</p>
    </div>
</div>

<form v-else class="review">
    <div class="review-header">
        <div class="review-rating">
            <input class="hidden" v-model="review.rating" ref="zeroRatingElement" type="radio" name="rating" value="0" :checked="review.rating === 0" />
            <span class="star-wrapper" v-for="number in 5" :key="number">
                <input v-model="review.rating" @click="clickStar(number)" type="radio" name="rating" :value="number" :id="'star' + number" :checked="review.rating === number" />
                <label class="star" :for="'star' + number">★</label>
            </span>
        </div>
        <div class="spacer"></div>
        <button class="button delete" @click.prevent="cancel">Cancel</button>
        <button class="button" @click.prevent="save">Save</button>
    </div>
    <textarea v-model="review.comment" class="review-textarea">{{ review.comment }}</textarea>
</form>
</template>

<style scoped>
.review {
    margin-top: 0.5em;
}

.review-header {
    display: flex;
    align-items: center;
    background-color: rgb(182, 238, 255);
    min-height: 40px;
}

.spacer {
    flex-grow: 1;
}

.review-header > * {
    margin-right: 0.5em;
}

.review-rating {
    display: flex;
    margin-left: 0.5em;
}

.review-rating .star {
    font-size: 2em;
    color: white;
    transition: color 0.2s;
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

.review-content {
    min-height: 75px;
    padding: 0.5em;
}

.review-textarea {
    min-height: 75px;
    width: 100%;
    resize: vertical;
    box-sizing: border-box;
}

</style>