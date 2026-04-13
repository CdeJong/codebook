<script setup lang="ts">
import { ref } from 'vue';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';
import { postRequest } from '@/services/http';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ first_name: '', last_name: '', email: '', password: '' });

const handleRegister = () => {
    postRequest('/register', form.value).then(
        _ => router.push({ name: 'auth.login' })
    );
}
 
</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Register</h1>
        </div>
    </div>

    <div class="page-content">
        <p>Join our community today! Create your account to start posting, commenting, and enjoying exclusive premium perks.</p>
        <p>Already have an account? <RouterLink :to="{ name: 'auth.login'}">Log in here</RouterLink> and jump right back in!</p>
    </div>

    <form class="form" @submit.prevent="handleRegister">
        <FormMessage />

        <label for="first_name">First name</label>
        <input type="text" name="first_name" id="first_name" v-model="form.first_name" required>
        <FormError name="first_name" />

        <label for="last_name">Last name</label>
        <input type="text" name="last_name" id="last_name" v-model="form.last_name" required>
        <FormError name="last_name" />

        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model="form.email" required>
        <FormError name="email" />

        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="form.password" required>
        <FormError name="password" />

        <button class="button" type="submit">Register</button>
    </form>
</template>