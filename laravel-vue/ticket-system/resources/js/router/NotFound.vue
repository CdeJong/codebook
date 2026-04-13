<script setup lang="ts">
import { isLoggedIn } from '@/services/auth';



</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">404 Page Not Found</h1>
        </div>
    </div>

    <div class="page-content">
        <p>The page you were trying to reach doesn't exist or was moved to another location!</p>
        <br>
        <p v-if="isLoggedIn"><RouterLink :to="{ name: 'tickets.index'}">Click here</RouterLink> to go back to the ticket overview</p>
        <p v-else>It could be that authentication is needed to view this page! try logging in <RouterLink :to="{ name: 'auth.login'}">here</RouterLink>!</p>
    </div>
</template>