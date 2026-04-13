<script setup lang="ts">
import { categoryStore } from '@/domains/categories/store';
import { Ticket } from '@/domains/tickets/ticket';
import { userStore } from '@/domains/users/store';
import { format } from '@/utils/datetime';
import { computed } from 'vue';

const ticket = defineModel<Ticket>({ required: true});
const categories = computed(() => {
    return categoryStore.getters.getAll().value.filter(category => ticket.value.category_ids.includes(category.id));
});    
const categoriesTitle = computed(() => categories.value.map(category => category.name).join(', '));

const user = userStore.getters.getById(ticket.value.user_id);
const username = computed(() => {
    if (!user.value) {
        return '';
    }
    return user.value.first_name + ' ' + user.value.last_name;
});

const assigned_user = computed(() => {
    const id = ticket.value.assigned_user_id;
    if (id == null) {
        return null;
    }
    return userStore.getters.getById(id).value;
});

const assigned_username = computed(() => {
    if (!assigned_user.value) {
        return '';
    }
    return assigned_user.value.first_name + ' ' + assigned_user.value.last_name;
});


</script>

<template>
<RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id }}" custom v-slot="{ navigate }">
    <tr @click="navigate">
        <td class="id">#{{ ticket.id }}</td>
        <td>
            <div class="title-cell">
                <div :title="ticket.title" class="title">{{ ticket.title }}</div>
                <div v-if="categories.length > 0" class="categories" :title="'categories: ' + categoriesTitle ">
                    <div class="category" v-for="category in categories" :key="category.id" >{{ category.name }}</div>
                </div>
            </div>
        </td>
        <td>{{ ticket.status }}</td>
        <td class="short" :title=username>{{ username }}</td>
        <td v-if="assigned_user" class="short" :title=assigned_username>{{ assigned_username }}</td> 
        <td v-else class="unassigned" title="No User Assigned">Unassigned</td> 
        <td>
            <div class="time">
                <div>{{ format(ticket.created_at) }}</div>
                <div v-if="ticket.created_at !== ticket.updated_at" class="edited">Edited: {{ format(ticket.updated_at) }}</div>
                <div v-else class="edited">Edited: n/a</div>
            </div> 
            
        </td>
    </tr>
</RouterLink>    
</template>

<style scoped>

.table tr {
    height: 55px;
}

.table .id {
    min-width: 0;
}

.table .unassigned {
    color: #888;
}

.table .title-cell {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    max-width: 400px;
}

.table .title-cell .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.categories {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow: hidden;
    gap: 0.25em;
    position: relative;
}

.category {
    flex: 0 0 auto;
    padding: 0.25em;
    background-color: aqua;
    border-radius: 10%;
    font-size: 0.8em;
}

.categories::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30px; /* fade width */
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
}

.table tbody tr:hover .categories::after {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, aquamarine 100%);  
}

.table .time {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.table .time .edited {
    font-size: 0.8em;
    color: #888;
}
</style>