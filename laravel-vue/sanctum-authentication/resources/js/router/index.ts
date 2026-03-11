import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from '@/domains/authentication/routes';

export const router = createRouter({
    history: createWebHistory(),
    routes: [...authRoutes],
});