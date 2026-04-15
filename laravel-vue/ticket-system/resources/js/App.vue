<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getLoggedInUser, logout, isAdmin } from '@/services/auth';
import DialogContainer from './services/dialog/DialogContainer.vue';

const router = useRouter();

const handleLogout = () => {
    logout().then(
        _ => router.push({ name: 'auth.login' })
    );
}

const user = getLoggedInUser;

</script>


<template>
    <header>
        <nav class="container">
            <ul>
                <li v-if="user"><router-link :to="{ name: 'tickets.index' }">Tickets</router-link></li>
                <li v-if="isAdmin()"><router-link :to="{ name: 'categories.index' }">Categories</router-link></li>
                <li v-if="isAdmin()"><router-link :to="{ name: 'users.index' }">Users</router-link></li>
            </ul>

            <ul>
                <li v-if="!user"><router-link :to="{ name: 'auth.login' }">Login</router-link></li>
                <li v-if="!user"><router-link :to="{ name: 'auth.register' }">Register</router-link></li>
                <li v-if="user"><router-link :to="{ name: 'auth.profile' }">{{ user.first_name + ' ' + user.last_name}}</router-link></li>
                <li v-if="user"><button @click.prevent="handleLogout">Logout</button></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <router-view />
    </div>

    <DialogContainer />
    
</template>