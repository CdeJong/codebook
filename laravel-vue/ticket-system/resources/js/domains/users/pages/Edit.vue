<script setup lang="ts">
import UserForm from '@/domains/users/components/UserForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { userStore } from '@/domains/users/store';
import { User } from '@/domains/users/user';

const router = useRouter();
const route = useRoute();
const id = +route.params.id;

if (!isNaN(id)) {
    // is number, fetch needed data
    userStore.actions.fetchById(id);
}

const user = userStore.getters.getById(id);

const handleSave = async (newUser : User) => {
    await userStore.actions.update(user.value.id, newUser);
    router.push({ name: 'users.index' });
}

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Edit User: {{ user?.first_name ?? '' }} {{ user?.last_name ?? '' }}</h1>
        </div>
    </div>

    <UserForm v-if="user" :user="user" @submit="handleSave" />
</template>