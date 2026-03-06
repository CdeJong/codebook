<script setup lang="ts">
import { authorStore } from '@/domains/authors/store';
import { bookStore } from '@/domains/books/store';
import { RouterLink } from 'vue-router';

bookStore.actions.fetchAll();
const books = bookStore.getters.getAll();

authorStore.actions.fetchAll();
</script>


<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Overzicht van alle boeken</h1>
        </div>
        <div class="secondary-header">
            <router-link class="button" :to="{name: 'books.create'}">Boek toevoegen</router-link>
        </div>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Titel</th>
                <th>Samenvatting</th>
                <th>Auteur</th>
                <th colspan="2" ></th>
            </tr>
        </thead>
        <tbody>
            <RouterLink 
                v-for="book in books" 
                :key="book.id" 
                :to="{ name : 'books.show', params: { id: book.id } }" 
                custom 
                v-slot="{ navigate }"
            >
                <tr @click="navigate">
                    <td class="short">{{ book.title }}</td>
                    <td class="long">{{ book.description }}</td>
                    <td class="short">{{ book.author?.first_name }} {{ book.author?.last_name }}</td>
                    <td><router-link class="button" :to="{name: 'books.edit', params: { id: book.id } }">Edit</router-link></td>
                    <td><button class="button delete" @click.stop="bookStore.actions.delete(book)" >Delete</button></td>
                </tr>
            </RouterLink>
        </tbody>
        

    </table>

</template>