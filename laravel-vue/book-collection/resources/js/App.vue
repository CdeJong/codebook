<template>
    <header>
        <nav class="container">
            <ul>
                <li><router-link :to="{name: 'books.index'}">Boeken</router-link></li>
                <li><router-link :to="{name: 'authors.index'}">Auteurs</router-link></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <router-view />
    </div>
    
</template>