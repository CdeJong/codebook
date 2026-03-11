<script setup lang="ts">
import { ref } from 'vue';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';
import { postRequest } from '@/services/http';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({email: '', password: ''})

const handleLogin = () => {
    postRequest("/login/", form.value).then(
        _ => router.push({ name: 'auth.profile' }),
        _ => {}
    );
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
    <p>Don't have an account yet? <a href="#">Sign up here</a>, it only takes a moment!</p>
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