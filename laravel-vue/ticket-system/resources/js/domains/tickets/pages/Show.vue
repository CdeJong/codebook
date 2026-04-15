<script setup lang="ts">

import { ticketStore } from '@/domains/tickets/store';
import { userStore } from '@/domains/users/store';
import { useRoute } from 'vue-router';
import { format } from '@/utils/datetime';
import { computed, watch } from 'vue';
import { categoryStore } from '@/domains/categories/store';
import NoteSection from '@/domains/notes/components/NoteSection.vue';
import { commentStore } from '@/domains/comments/store';
import { isAdmin } from '@/services/auth';
import CommentSection from '@/domains/comments/components/CommentSection.vue';

const route = useRoute();
const id = +route.params.id;

if (!isNaN(id)) {
    // is number, fetch needed data
    ticketStore.actions.fetchById(id);
    userStore.actions.fetchAll();
    categoryStore.actions.fetchAll();
}

const ticket = ticketStore.getters.getById(id);

const time = computed(() => {
    if (ticket.value == null) {
        return '';
    }

    const createdAt = ticket.value.created_at; 
    const updatedAt = ticket.value.updated_at;

    let result = format(createdAt);

    if (createdAt !== updatedAt) {
        result += ' (Last Updated: ' + format(updatedAt) + ')';
    }

    return result;
});

const user_name = computed(() => {
    if (ticket.value == null) {
        return '';
    }

    const user = userStore.getters.getById(ticket.value.user_id);

    if (user.value == null) {
        return "Unknown";
    }

    return user.value.first_name + ' ' + user.value.last_name;
});

const assigned_name = computed(() => {
    if (!ticket.value) {
        return '';
    }

    const user_id = ticket.value.assigned_user_id;

    if (user_id === null) {
        return 'Usassigned';
    }

    const user = userStore.getters.getById(user_id);

    if (user.value == null) {
        return 'Unknown';
    }

    return user.value.first_name + ' ' + user.value.last_name;
});

const categories = computed(() => {
    if (!ticket.value) {
        return [];
    }
    return categoryStore.getters.getAll().value.filter(category => ticket.value.category_ids.includes(category.id));
});    
const categoriesTitle = computed(() => categories.value.map(category => category.name).join(', '));



const handleCommentDelete = async (commentId : number) => {
    await commentStore.actions.deleteById(commentId);

    const copy = { ...ticket.value };
    copy.comments = copy.comments.filter(comment => comment.id === commentId);
    ticketStore.setters.set(copy);
}

</script>

<template>
    <template v-if="ticket">
        <div class="content-header">
            <div class="primary-header">
                <h1 class="title">Ticket: {{ ticket.title }}</h1>
            </div>
            <div class="secondary-header">
                <p class="title">{{ user_name }} - {{ time }}</p>
            </div>
        </div>

        <div class="ticket">
            <div class="main">
                <div class="content">{{ ticket.content }}</div>
                <CommentSection v-model="ticket" />
            </div>

            <div class="sidebar">
                <dl>
                    <dt>Created By:</dt><dd>{{ user_name }}</dd>
                    <dt>Assigned To:</dt><dd>{{ assigned_name }}</dd>
                    <dt>Status:</dt><dd>{{ ticket.status }}</dd>
                    <dt>Categories:</dt>
                    <dd>
                        <div v-if="categories.length == 0">-</div>
                        <div v-else class="categories" :title="categoriesTitle">
                            <div v-for="category in categories" :key="category.id" class="category">{{ category.name }}</div>
                        </div>
                    </dd>
                    <dt>Created At:</dt><dd>{{ format(ticket.created_at) }}</dd>
                    <template v-if="ticket.created_at !== ticket.updated_at">
                    <dt>Updated At:</dt><dd>{{ format(ticket.updated_at) }}</dd>    
                    </template>
                    
                </dl>

                <NoteSection v-if="isAdmin()" v-model="ticket" />
            </div>
        </div>     
    </template>
</template>

<style scoped>
.ticket {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.5em;
}

.ticket .content {
    padding: 0.5em;
    min-height: 50vh;
}

.ticket .sidebar {
    background-color: rgb(216, 253, 253);
    padding: 0.5em;
}

.ticket .sidebar dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-auto-rows: minmax(1.1em, auto);
    gap: 0.5em 1em;
}

.ticket .sidebar dl > * {
    min-height: 25px;
}

/* .notes {
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.notes .note {
    background-color: white;
    padding: 0.5em;
    min-height: 100px;
}

.notes .note .note-header {
    display: flex;
}

.notes .note .note-header .title {
    flex-grow: 1;
}

.notes .note .note-header button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.notes .note .note-content {
    min-height: 75px;
    margin-bottom: 0.5em;
} */

.categories {
    display: flex;
    width: 100%;
    gap: 0.25em;
    flex-wrap: wrap;
}

.category {
    flex: 0 0 auto;
    padding: 0.25em;
    background-color: aqua;
    border-radius: 10%;
}


</style>