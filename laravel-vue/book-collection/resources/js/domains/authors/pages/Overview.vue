<script setup lang="ts">
import { fetchAuthors, getAllAuthors } from '@/domains/authors/store';

fetchAuthors();
</script>


<template>
    <h1>Authors Overview</h1>

    <table class="table">
        <thead>
            <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in getAllAuthors" :key="book.id">
                <td>{{ book.first_name }}</td>
                <td>{{ book.last_name }}</td>
            </tr>
        </tbody>
    </table>

</template>