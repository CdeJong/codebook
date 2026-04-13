<script setup lang="ts">
import UserRow from '@/domains/users/components/UserRow.vue';
import { User } from '@/domains/users/user';

const users = defineModel<User[]>();

</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th class="id"></th>
                <th>First name</th>
                <th>Last name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created At</th>
                <th colspan="2"></th>
            </tr>
        </thead>
        <tbody v-if="users && users.length > 0"> 
            <UserRow v-for="user, index in users" key="user.id" v-model="users[index]" />
        </tbody>
        <tbody v-else>
            <tr>
                <td class="id"></td>
                <td colspan=8>No Users found...</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

.table .id {
    min-width: 20px;
}

</style>