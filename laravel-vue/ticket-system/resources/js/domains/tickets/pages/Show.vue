<script setup lang="ts">

import { ticketStore } from '@/domains/tickets/store';
import { userStore } from '@/domains/users/store';
import { useRoute } from 'vue-router';
import { format } from '@/utils/datetime';
import { computed, ref, watch } from 'vue';
import { categoryStore } from '@/domains/categories/store';
import NoteSection from '@/domains/notes/components/NoteSection.vue';
import { commentStore } from '@/domains/comments/store';
import { getLoggedInUser, isAdmin } from '@/services/auth';
import CommentSection from '@/domains/comments/components/CommentSection.vue';
import CategorySelect from '@/domains/categories/components/CategorySelect.vue';

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

// todo clean up?
const category_ids = ref<number[]>([]);
watch(
    () => ticket.value?.category_ids,
    (newIds) => {
        if (newIds) {
            category_ids.value = [...newIds];
        }
        
    }
)

const categories = computed(() => {
    if (!ticket.value) {
        return [];
    }
    return categoryStore.getters.getAll().value.filter(category => category_ids.value.includes(category.id));
});    
const categoriesTitle = computed(() => categories.value.map(category => category.name).join(', '));

const admins = computed(() => {
    return userStore.getters.getAll().value.filter(user => user.is_admin);
});


const handleCommentDelete = async (commentId : number) => {
    await commentStore.actions.deleteById(commentId);

    const copy = { ...ticket.value };
    copy.comments = copy.comments.filter(comment => comment.id === commentId);
    ticketStore.setters.set(copy);
}

// Temp for testing

const handleAssignee = () => {
    const id = getLoggedInUser.value?.id;

    if (id == undefined) {
        console.log('not logged in!');
        return;
    }

    ticketStore.actions.patchAssignee(ticket.value.id, id);
}

const handleCategories = async () => {
    await ticketStore.actions.patchCategories(ticket.value.id, category_ids.value);
}

const handleStatus = () => {
    ticketStore.actions.patchStatus(ticket.value.id, 'COMPLETED');
}

</script>

<template>
    <template v-if="ticket">
        <div class="content-header">
            <div class="primary-header">
                <h1 class="title">Ticket: {{ ticket.title }}</h1>
                <button class="button" @click.prevent="handleAssignee">Assignee</button>
                <button class="button" @click.prevent="handleCategories">Categories</button>
                <button class="button" @click.prevent="handleStatus">Status</button>
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

                <div class="property">
                    <div class="property-key">Created By:</div>
                    <div class="property-value">{{ user_name }}</div>
                </div>

                <div class="property">
                    <div class="property-key">Assigned To:</div>
                    <div class="property-value">{{ assigned_name }}</div>
                    <!-- <div class="property-menu">
                        <div v-for="admin in admins" key="admin.id">{{ admin.first_name }} {{ admin.last_name }}</div>
                    </div> -->
                </div>

                <div class="property">
                    <div class="property-key">Status:</div>
                    <div class="property-value">{{ ticket.status }}</div>
                    <!-- <div class="property-menu">
                        <div>PENDING</div>
                        <div>IN PROGRESS</div>
                        <div>COMPLETED</div>
                    </div> -->
                </div>

                <div class="property">
                    <div class="property-key">Categories:</div>
                    <div class="property-value">
                        <div v-if="categories.length == 0">-</div>
                        <div v-else class="categories" :title="categoriesTitle">
                            <div v-for="category in categories" :key="category.id" class="category">{{ category.name }}</div>
                        </div>
                    </div>
                    <div class="property-menu">
                        <CategorySelect v-model="category_ids" />
                        <button class="button" @click.prevent="handleCategories">Save</button>
                    </div>
                </div>

                <div class="property">
                    <div class="property-key">Created At:</div>
                    <div class="property-value">{{ format(ticket.created_at) }}</div>
                </div>

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
    /* padding: 0.5em; */
}

.property {
    width: 100%;
    position: relative;
}

.property-key {
    background-color: rgb(146, 255, 255);
    padding: 0.5em;
}

.property-value {
    padding: 0.5em;
}

.property-menu {
    position: absolute;
    top: auto;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    z-index: 10;
    border: 1px solid rgb(69, 171, 255);
}

/* .property-menu CategorySelect {
    max-height: 200px;
    overflow: scroll;
} */

/* .ticket .sidebar dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-auto-rows: minmax(1.1em, auto);
    gap: 0.5em 1em;
}

.ticket .sidebar dl > * {
    min-height: 25px;
} */

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