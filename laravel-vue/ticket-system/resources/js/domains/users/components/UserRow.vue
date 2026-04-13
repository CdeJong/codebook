<script setup lang="ts">
import { showNotice } from '@/services/dialog';
import { User } from '@/domains/users/user';
import { userStore } from '@/domains/users/store';
import { destroyMessage, getMessage } from '@/services/error';
import { format } from '@/utils/datetime';
import { ticketStore } from '@/domains/tickets/store';

const user = defineModel<User>({ required: true});

const handleDelete = () => {
    userStore.actions.delete(user.value).then(
        _ => {
            // delete was successful, clear the ticket store so cascade deleted tickets arent shown
            ticketStore.setters.clear();
        },
        _ => {
            // delete failed, todo error message is obtained from an external system...
            showNotice("Oops! You cannot do this!", getMessage.value, () => destroyMessage());
        }
    );
}

</script>

<template>
<tr>
    <td class="id">#{{ user.id }}</td>
    <td>{{ user.first_name }}</td>
    <td>{{ user.last_name }}</td>
    <td>{{ user.is_admin ? 'ADMIN' : 'MEMBER' }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone_number }}</td>
    <td>{{ format(user.created_at) }}</td>
    <td><RouterLink class="button" :to="{ name: 'users.edit', params: { id: user.id }}">Edit</RouterLink></td>
    <td><button class="button delete" @click.prevent="handleDelete">Delete</button></td>
</tr>
</template>

<style scoped>

.id {
    min-width: 20px;
    text-align: right;
}

</style>