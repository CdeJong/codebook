<template>
    <nav>
        <router-link :to="{name: 'books.index'}">Boeken Overzicht</router-link> |
        <router-link :to="{name: 'books.create'}">Nieuw Boek</router-link> |
        <router-link :to="{name: 'authors.index'}">Authors</router-link>
    </nav>
    <router-view></router-view>
</template>