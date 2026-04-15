<script setup lang="ts">
import { Comment } from '@/domains/comments/comment';
import { format } from '@/utils/datetime';
import { userStore } from '@/domains/users/store';
import { ref, computed } from 'vue';
import { showConfirm, showNotice } from '@/services/dialog';
import { isAdminOrHasId } from '@/services/auth';


const comment = defineModel<Comment>({ required: true });

const emit = defineEmits(['deleteComment', 'updateComment']);

const isEditing = ref<boolean>(false);
const formComment = ref<Comment>({ ...comment.value }); 

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

const handleEdit = () => {
    isEditing.value = true;
}

const handleDelete = () => {
    showConfirm(
        "Delete comment", 
        "Are you sure you want to delete this comment?",
        null,
        handleConfirmedDelete
    );
}

const handleConfirmedDelete = () => {
    emit('deleteComment', comment.value.id);
}

const handleSave = () => {
    if (comment.value.content != formComment.value.content) {
        emit('updateComment', formComment.value);
    }
    isEditing.value = false;
}

const handleCancel = () => {
    isEditing.value = false;
}

const handleReport = () => {
    showNotice(
        'Comment Report',
        'Thank you for the report! We will look into it as fast as possible!',
        null, // ye we don't do anything with your report lol!
        'Ok'
    );
}
</script>

<template>
<form v-if="isEditing" class="comment" @submit.prevent="handleSave">
    <div class="comment-header">
        <div class="profile-picture"></div>
        <h3 class="title">{{ username }}</h3>
        <button type="submit">
            <i class="fa-solid fa-floppy-disk primary"></i>
        </button>
        <button @click.prevent="handleCancel">
            <i class="fa-solid fa-xmark danger"></i>
        </button>
    </div>
    <textarea class="comment-content" v-model="formComment.content" v-auto-resize></textarea>
    <div v-if="isEdited" 
        class="comment-footer" 
        :title="'Last edited ' + format(comment.updated_at)"
    >{{ format(comment.created_at) }} (Edited)</div>
    <div v-else class="comment-footer">{{ format(comment.created_at) }}</div>
</form>

<div v-else class="comment">
    <div class="comment-header">
        <div class="profile-picture"></div>
        <h3 class="title">{{ username }}</h3>

        <template v-if="isAdminOrHasId(comment.user_id)">
            <button class="hide" @click.prevent="handleEdit">
                <i class="fa-solid fa-pen primary"></i>
            </button>
            <button class="hide" @click.prevent="handleDelete">
                <i class="fa-solid fa-trash danger"></i>
            </button>
        </template>
        <template v-else>
            <button class="hide" @click.prevent="handleReport">
                <i class="fa-solid fa-bullhorn danger"></i>
            </button>
        </template>
    
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
    resize: vertical;
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