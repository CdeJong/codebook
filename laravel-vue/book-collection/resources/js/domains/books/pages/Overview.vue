<script setup lang="ts">
import { fetchBooks, getAllBooks } from '@/domains/books/store';

fetchBooks();
</script>


<template>
    <h1>Books Overview</h1>

    <table class="table">
        <thead>
            <tr>
                <th>Titel</th>
                <th>Samenvatting</th>
                <!-- <th>Author</th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in getAllBooks" :key="book.id">
                <td>{{ book.title }}</td>
                <td>{{ book.description }}</td>
            </tr>
        </tbody>
        

    </table>

</template>