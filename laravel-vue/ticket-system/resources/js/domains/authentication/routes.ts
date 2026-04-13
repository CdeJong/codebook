import Login from '@/domains/authentication/pages/Login.vue';
import Profile from '@/domains/authentication/pages/Profile.vue';
import Register from './pages/Register.vue';
import { createRoute } from '@/router';

export const authRoutes = [
    createRoute('/login', Login, 'auth.login', { requiresGuest: true, requiresAuth: false }),
    createRoute('/register', Register, 'auth.register', { requiresGuest: true, requiresAuth: false }),
    createRoute('/profile', Profile, 'auth.profile')
];