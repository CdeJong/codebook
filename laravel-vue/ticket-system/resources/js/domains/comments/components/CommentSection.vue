<script setup lang="ts">
import { computed } from 'vue';
import { Ticket } from '@/domains/tickets/ticket';
import CommentComponent from '@/domains/comments/components/CommentComponent.vue';
import { Comment } from '@/domains/comments/comment';
import { ref } from 'vue';
import { commentStore } from '@/domains/comments/store';
import { ticketStore } from '@/domains/tickets/store';
import FormMessage from '@/services/error/FormMessage.vue';


const ticket = defineModel<Ticket>({ required: true });
const form = ref<Comment>({
    content: '',
    ticket_id: ticket.value.id,

    id: 0,
    user_id: 0,
    created_at: '',
    updated_at: ''
});

const handleCreate = async () => {
    const copyForm = { ...form.value }
    form.value.content = '';
    const createdComment = await commentStore.actions.create(copyForm);

    if (!createdComment) {
        return;
    }

    // update locally in ticketStore
    const copy = { ...ticket.value }
    copy.comments.push(createdComment);
    ticketStore.setters.set(copy);

    form.value.content = '';
}

const handleUpdate = async (comment : Comment) => {
    const updatedComment = await commentStore.actions.update(comment.id, comment);

    if (!updatedComment) {
        return;
    }

    // update locally in ticketStore
    const copy = { ...ticket.value };
    const index = copy.comments.findIndex(c => c.id === comment.id);
    if (index === -1) {
        return;
    }
    copy.comments.splice(index, 1, updatedComment);
    ticketStore.setters.set(copy);
}

const handleDelete = async (commentId : number) => {
    await commentStore.actions.deleteById(commentId);

    // update locally in ticketStore
    const copy = { ...ticket.value };
    copy.comments = copy.comments.filter(c => c.id !== commentId);
    ticketStore.setters.set(copy);
}

const sortedComments = computed(() => {
    if (!ticket.value || !ticket.value.comments || ticket.value.comments.length < 1) {
        return [];
    }
    return ticket.value.comments.sort((comment1, comment2) => new Date(comment1.created_at).getTime() - new Date(comment2.created_at).getTime());
});
</script>

<template>
<div>
    <form class="form" @submit.prevent="handleCreate">
        <textarea v-model="form.content" :class="{ 'has-value': form.content.trim().length > 0 }" placeholder="Post a new comment..." required></textarea>
        <button class="button">Post Comment</button>
    </form>

    <div class="comments">
        <CommentComponent v-for="comment, index in sortedComments" :key="comment.id" v-model="sortedComments[index]" @updateComment="handleUpdate" @deleteComment="handleDelete" />
    </div>
</div>
</template>

<style scoped>
.form {
    width: 100%;
}

textarea {
    min-height: 2em;
    transition: ease-in-out 0.5s min-height;
}

textarea:focus {
    min-height: 100px;
}

textarea.has-value {
    min-height: 100px;
}

.comments {
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}
</style>