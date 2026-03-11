<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getRequest } from '@/services/http';
import ErrorPopUp from '@/services/error/ErrorPopUp.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

type User = {
    username: string
}

const user = ref<User>();

onMounted(async () => {
    await getRequest('/me').then(
        response => user.value = response.data,
        error => {
            // should probably be moved to http service, but http would need some setter to set the login page name
            if (error.response.status === 401) {
                router.push({ name: 'auth.login' });
            } else {
                console.log('Uncaught error: ' + error)
            }

        } 
    );
});

</script>

<template>

<ErrorPopUp />

<div class="content-header">
    <div class="primary-header">
        <h1 class="title">Profile</h1>
    </div>
</div>

<div class="page-content">
    <p v-if="user">Username: {{ user.username }}</p>
</div>

</template>