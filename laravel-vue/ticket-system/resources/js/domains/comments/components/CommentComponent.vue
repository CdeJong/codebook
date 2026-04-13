<script setup lang="ts">
import { Comment } from '@/domains/comments/comment';
import { format } from '@/utils/datetime';
import { userStore } from '@/domains/users/store';
import { computed } from 'vue';


const comment = defineModel<Comment>({ required: true });

const user = userStore.getters.getById(comment.value.user_id);
const username = computed(() => {
    if (!user.value) {
        return '';
    }
    return user.value.first_name + ' ' + user.value.last_name;
});

const isEdited = computed(() => {
    return comment.value.created_at !== comment.value.updated_at;
});

const handleUpdate = () => {
    
}

</script>

<template>
<form class="comment" @submit.prevent="handleUpdate">
    <div class="comment-header">
        <div class="profile-picture"></div>
        <h3 class="title">{{ username }}</h3>
        <button class="primary">
            <i class="fa-solid fa-floppy-disk primary"></i>
        </button>
        <button class="danger">
            <i class="fa-solid fa-xmark danger"></i>
        </button>
    </div>
    <textarea class="comment-content">{{ comment.content }}</textarea>
    <div v-if="isEdited" 
        class="comment-footer" 
        :title="'Last edited ' + format(comment.updated_at)"
    >{{ format(comment.created_at) }} (Edited)</div>
    <div v-else class="comment-footer">{{ format(comment.created_at) }}</div>
</form>

<div class="comment">
    <div class="comment-header">
        <div class="profile-picture"></div>
        <h3 class="title">{{ username }}</h3>
        <button class="primary hide">
            <i class="fa-solid fa-pen primary"></i>
        </button>
        <button class="danger hide">
            <i class="fa-solid fa-trash danger"></i>
        </button>
    </div>
    <div class="comment-content">{{ comment.content }}</div>
    <div v-if="isEdited" 
        class="comment-footer" 
        :title="'Last edited ' + format(comment.updated_at)"
    >{{ format(comment.created_at) }} (Edited)</div>
    <div v-else class="comment-footer">{{ format(comment.created_at) }}</div>
</div>
</template>

<style scoped>

.comment {
    padding-left: 50px
}

.comment:hover {
    background-color: rgb(229, 255, 255);
    
}

.comment .comment-header {
    display: flex;
    align-items: center;
    position: relative;
}

.comment .comment-header .profile-picture {
    position: absolute;
    top: 5px;
    left: -45px;

    background-color: rgb(192, 224, 252);
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.comment .comment-header .title {
    flex-grow: 1;
}

.comment .comment-header button {
    background: none;
    border: none;
    padding: 0.25em;
    cursor: pointer;
}

button.hide {
    transition: 0.5s opacity;
    opacity: 0;
}

.comment:hover button.hide {
    opacity: 1;
}

.comment .comment-content {
    margin-bottom: 0.5em;
    white-space: pre-wrap;
}

.comment textarea {
    width: calc(100% - 5px);
    border: none;
    background-color: #e7e7e7;
    padding: 0;
}

.comment .comment-footer {
    font-size: 0.9em;
    margin-bottom: 0.5em;
}

.primary {
    color: rgb(42, 224, 224);
}

.danger {
    color: red;
}

</style>