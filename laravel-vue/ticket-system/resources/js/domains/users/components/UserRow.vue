<script setup lang="ts">
import { useDialog } from '@/services/dialog';
import { User } from '@/domains/users/user';
import { userStore } from '@/domains/users/store';
import { destroyMessage, getMessage } from '@/services/error';
import { format } from '@/utils/datetime';
import { ticketStore } from '@/domains/tickets/store';

const user = defineModel<User>({ required: true});
const dialog = useDialog();

const handleDelete = async () => {
    try {
        await userStore.actions.delete(user.value);
        ticketStore.setters.clear(); // clear cache as some tickets are deleted
    } catch (error : any) {
        const message = error.response.data.message ?? "Something went wrong, but no error message was provided!";
        dialog.show({
            title: 'Oops! Something went wrong',
            description: message,
            buttons: [{ text: 'Ok' }],
            style: 'danger'
        })
    }
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
    <td><button class="button danger" @click.prevent="handleDelete">Delete</button></td>
</tr>
</template>

<style scoped>

.id {
    min-width: 20px;
    text-align: right;
}

</style>