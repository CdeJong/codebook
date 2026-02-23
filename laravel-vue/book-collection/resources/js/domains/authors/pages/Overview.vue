<script setup lang="ts">
import { fetchAuthors, getAllAuthors, deleteAuthor } from '@/domains/authors/store';
import { RouterLink } from 'vue-router';

fetchAuthors();
</script>


<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Auteurs</h1>
        </div>
        <div class="secondary-header">
            <router-link class="button" :to="{name: 'authors.create'}">Auteur toevoegen</router-link>
        </div>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
                <th colspan="2"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="author in getAllAuthors" :key="author.id">
                <td>{{ author.first_name }}</td>
                <td>{{ author.last_name }}</td>
                <td><router-link class="button" :to="{name: 'authors.edit', params: { id: author.id } }">Edit</router-link></td>
                <td><button class="button delete" @click="deleteAuthor(author.id)" >Delete</button></td>
            </tr>
        </tbody>
    </table>

</template>