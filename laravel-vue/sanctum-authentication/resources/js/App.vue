<template>
    <header>
        <nav class="container">
            <ul>
                <li><router-link :to="{name: 'auth.login'}">Login</router-link></li>
                <li><router-link :to="{name: 'auth.profile'}">Profile</router-link></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <router-view />
    </div>
    
</template>