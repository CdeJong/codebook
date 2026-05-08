<script setup lang="ts">

import { getLoggedInUser } from '@/services/auth'
import { format } from '@/utils/datetime';

const user = getLoggedInUser;

</script>

<template>

    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Profile</h1>
        </div>
    </div>

    <div v-if="user" class="page-content">
        <p>First name: {{ user.first_name }}</p>
        <p>Last name: {{ user.last_name }}</p>
        <p>Admin: {{ user.is_admin ? 'Yes' : 'No' }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Joined: {{ format(user.created_at) }}</p>
    </div>
</template>