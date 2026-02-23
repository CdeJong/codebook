import { createRouter, createWebHistory } from 'vue-router';
import { bookRoutes } from '@/domains/books/routes';
import { authorRoutes } from '@/domains/authors/routes';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...bookRoutes,
        ...authorRoutes
    ]
});