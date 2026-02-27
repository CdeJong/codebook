<script setup lang="ts">
import { bookStore } from '@/domains/books/store';

bookStore.actions.fetchAll();
const books = bookStore.getters.getAll();
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
                <th colspan="2" ></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in books" :key="book.id">
                <td class="short">{{ book.title }}</td>
                <td class="long">{{ book.description }}</td>
                <td><router-link class="button" :to="{name: 'books.edit', params: { id: book.id } }">Edit</router-link></td>
                <td><button class="button delete" @click="bookStore.actions.delete(book)" >Delete</button></td>
            </tr>
        </tbody>
        

    </table>

</template>