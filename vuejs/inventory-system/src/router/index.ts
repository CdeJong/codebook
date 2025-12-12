import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/domain/product/routes.ts';

export const router = createRouter({
    history: createWebHistory(),
    routes
});