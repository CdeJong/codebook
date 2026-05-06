<script setup lang="ts">

import { ticketStore } from '@/domains/tickets/store';
import { userStore } from '@/domains/users/store';
import { categoryStore } from '@/domains/categories/store';
import { useRoute, useRouter } from 'vue-router';
import { format } from '@/utils/datetime';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import NoteSection from '@/domains/notes/components/NoteSection.vue';
import { isAdmin } from '@/services/auth';
import CommentSection from '@/domains/comments/components/CommentSection.vue';
import CategorySelect from '@/domains/categories/components/CategorySelect.vue';
import { arraysEqual } from '@/utils/array';
import UserSelect from '@/domains/users/components/UserSelect.vue';

const router = useRouter();
const route = useRoute();
const id = +route.params.id;

onMounted(async () => {
    if (isNaN(id)) {
        router.replace({ name: 'notfound' });
        return;
    }

    try {
        await ticketStore.actions.fetchById(id);
        await Promise.all([
            userStore.actions.fetchAll(),
            categoryStore.actions.fetchAll()
        ]);
    } catch (error) {
        router.replace({ name: 'notfound' });
    }
});

const ticket = ticketStore.getters.getById(id);

// form like values, can be updated!
const assigned_user_id = ref<number | null>(null);
const status = ref<string>('');
const category_ids = ref<number[]>([]);
watch(
    () => ticket.value,
    (ticket) => {
        if (!ticket) {
            return;
        }
        status.value = ticket.status;
        category_ids.value = [...ticket.category_ids];
        assigned_user_id.value = ticket.assigned_user_id;
    },
    { immediate: true }
);

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
        return 'loading...';
    }

    return user.value.first_name + ' ' + user.value.last_name;
});

const assigned_name = computed(() => {
    if (!ticket.value) {
        return '';
    }

    const user_id = assigned_user_id.value;

    if (user_id === null) {
        return 'Usassigned';
    }

    const user = userStore.getters.getById(user_id);

    if (user.value == null) {
        return 'Unknown';
    }

    return user.value.first_name + ' ' + user.value.last_name;
});

const allCategories = categoryStore.getters.getAll();
const categories = computed(() => {
    if (!ticket.value) {
        return [];
    }
    return allCategories.value.filter(category => category_ids.value.includes(category.id));
});    
const categoriesTitle = computed(() => categories.value.map(category => category.name).join(', '));

const admins = computed(() => {
    return userStore.getters.getAll().value.filter(user => user.is_admin);
});

// on page ticket editting

const activeMenu = ref<null | string>(null);

const toggleMenu = (name : string) => {
    if (!isAdmin()) {
        return;
    }

    closeMenu(); // close & save current

    if (activeMenu.value === null) {
        activeMenu.value = name;
    }
}

const closeMenu = () => {
    if (activeMenu.value === null || !isAdmin()) {
        return;
    }

    // save dirty values on close
    if (activeMenu.value === 'categories' && !arraysEqual(ticket.value.category_ids, category_ids.value)) {
        ticketStore.actions.patchCategories(ticket.value.id, category_ids.value);
    } else if (activeMenu.value === 'assignee' && ticket.value.assigned_user_id !== assigned_user_id.value) {
        ticketStore.actions.patchAssignee(ticket.value.id, assigned_user_id.value);
    } else if (activeMenu.value === 'status' && ticket.value.status !== status.value) {
        ticketStore.actions.patchStatus(ticket.value.id, status.value);
    }
    
    activeMenu.value = null;
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
});

const handleClickOutside = (event : PointerEvent) => {
    const target = event.target as HTMLElement;

    const clickedMenu = target.closest('.property-menu');
    const clickedButton = target.closest('.property');

    if (!clickedMenu && !clickedButton) {
        closeMenu();
    }
}

</script>

<template>
    <template v-if="ticket">
        <div class="content-header">
            <div class="primary-header">
                <h1 class="title">Ticket: {{ ticket.title }}</h1>
                <RouterLink class="button" :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Edit Ticket</RouterLink>
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

                <div class="property" @click.prevent="toggleMenu('assignee')">
                    <div class="property-key">Assigned To:</div>
                    <div class="property-value">
                        <p>{{ assigned_name }}</p>
                        <i v-if="isAdmin()" class="fa-solid fa-pen primary"></i>
                    </div>
                    <div class="property-menu" v-if="activeMenu === 'assignee'" @click.stop>
                        <UserSelect v-model="assigned_user_id" :users="admins" nullable />
                    </div>
                </div>

                <div class="property" @click.prevent="toggleMenu('status')">
                    <div class="property-key">Status:</div>
                    <div class="property-value">
                        <p>{{ status?.replace('_', ' ') }}</p>
                        <i v-if="isAdmin()" class="fa-solid fa-pen primary"></i>
                    </div>
                    <div class="property-menu" v-if="activeMenu === 'status'" @click.stop>
                        <div class="status-select">
                            <label for="status-pending">
                                <input id="status-pending" type="radio" v-model="status" value="PENDING">
                                <div class="value">PENDING</div>
                            </label>
                            <label for="status-in-progress">
                                <input id="status-in-progress" type="radio" v-model="status" value="IN_PROGRESS">
                                <div class="value">IN PROGRESS</div>
                            </label>
                            <label for="status-completed">
                                <input id="status-completed" type="radio" v-model="status" value="COMPLETED">
                                <div class="value">COMPLETED</div>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="property"  @click.prevent="toggleMenu('categories')">
                    <div class="property-key">Categories:</div>
                    <div class="property-value">
                        <div v-if="categories.length == 0">-</div>
                        <div v-else class="categories" :title="categoriesTitle">
                            <div v-for="category in categories" :key="category.id" class="category">{{ category.name }}</div>
                            <div v-if="isAdmin()" class="edit-category">
                                <i class="fa-solid fa-pen primary"></i>
                            </div>
                            
                        </div>
                    </div>
                    <div class="property-menu" v-if="activeMenu === 'categories'" @click.stop>
                        <CategorySelect v-model="category_ids" :categories="allCategories" />
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
    white-space: pre-wrap;
}

.ticket .sidebar {
    background-color: rgb(216, 253, 253);
}

.property {
    width: 100%;
    position: relative;
}

.property i {
    cursor: pointer;
    transition: 0.5s opacity;
    opacity: 0;
}

.property:hover i {
    opacity: 1;
}

.property-key {
    background-color: rgb(146, 255, 255);
    padding: 0.5em;
}

.property-value {
    display: flex;
    align-items: center;
    padding: 0.5em;
    gap: 0.25em;
}

.property-value > i {
    color: rgb(1, 141, 141);
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

.property-menu .category-select {
    max-height: 200px;
    overflow: scroll;
}

.categories {
    display: flex;
    width: 100%;
    gap: 0.25em;
    flex-wrap: wrap;
    align-items: center;
}

.category {
    padding: 0.25em;
    background-color: aqua;
    border-radius: 10%;
}

.edit-category {
    color: rgb(1, 141, 141);    
}

/* status select */

.status-select label input {
    width: 25px;
    margin: 0;
}

.status-select label {
    display: flex;
    height: 25px;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
}

.status-select label .value {
    flex-grow: 1;
}

.status-select label:hover {
    background-color: blue;
}

</style>