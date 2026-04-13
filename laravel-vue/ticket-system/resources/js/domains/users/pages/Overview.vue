<script setup lang="ts">
import UserTable from '@/domains/users/components/UserTable.vue';
import { userStore } from '@/domains/users/store';

userStore.actions.fetchAll();
const users = userStore.getters.getAll();

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">User Overview</h1>
        </div>
    </div>

    <UserTable v-model="users" />

</template>