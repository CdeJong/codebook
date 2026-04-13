<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormMessage from '@/services/error/FormMessage.vue';
import FormError from '@/services/error/FormError.vue';
import { login } from '@/services/auth';
import { getQueryParam } from '@/utils/query';

const route = useRoute();
const router = useRouter();
const form = ref({ email: '', password: '' });

const handleLogin = () => {
    login(form.value).then(_ => {
        const redirect = getQueryParam(route.query.redirect);

        if (redirect) { 
            router.push(redirect); // user input, should be checked before ever going into production
            return;
        }

        router.push({ name: 'tickets.index' });
    });
}
</script>

<template>
<div class="content-header">
    <div class="primary-header">
        <h1 class="title">Login</h1>
    </div>
</div>

<div class="page-content">
    <p>Welcome back! Log in to join the conversation, create your own posts, and show your support by upgrading to premium.</p>
    <p>Don't have an account yet? <RouterLink :to="{ name: 'auth.register'}">Sign up here</RouterLink>, it only takes a moment!</p>
</div>

<form class="form" @submit.prevent="handleLogin">
    <FormMessage />
    <label for="email">E-mail</label>
    <input type="email" name="email" id="email" required v-model="form.email">
    <FormError name="email" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required v-model="form.password">
    <FormError name="password" />
    <button class="button" type="submit">Login</button>
</form>

</template>