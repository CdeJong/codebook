<script setup lang="ts">
import { authorStore } from '@/domains/authors/store';
import ErrorPopUp from '@/services/error/ErrorPopUp.vue';
import { RouterLink } from 'vue-router';

authorStore.actions.fetchAll();

// vue starts crying when I immidiately use this in the v-for :/
const authors = authorStore.getters.getAll();

</script>


<template>
    <ErrorPopUp />

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
            <tr v-for="author in authors" :key="author.id">
                <td class="short">{{ author.first_name }}</td>
                <td class="short">{{ author.last_name }}</td>
                <td><router-link class="button" :to="{name: 'authors.edit', params: { id: author.id } }">Edit</router-link></td>
                <td><button class="button delete" @click="authorStore.actions.delete(author)" >Delete</button></td>
            </tr>
        </tbody>
    </table>

</template>