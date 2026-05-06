import Login from '@/domains/authentication/pages/Login.vue';
import Profile from '@/domains/authentication/pages/Profile.vue';
import Register from '@/domains/authentication/pages/Register.vue';
import PasswordReset from '@/domains/authentication/pages/PasswordReset.vue';
import { createRoute } from '@/router';


export const authRoutes = [
    createRoute('/login', Login, 'auth.login', { requiresGuest: true, requiresAuth: false }),
    createRoute('/register', Register, 'auth.register', { requiresGuest: true, requiresAuth: false }),
    createRoute('/profile', Profile, 'auth.profile'),
    createRoute('/password-reset', PasswordReset, 'auth.password-reset', { requiresGuest: true, requiresAuth: false })
];