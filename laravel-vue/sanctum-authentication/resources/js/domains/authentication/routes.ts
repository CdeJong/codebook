import Login from '@/domains/authentication/pages/Login.vue';
import Profile from '@/domains/authentication/pages/Profile.vue';

export const authRoutes = [
    { path: '/login', component: Login, name: 'auth.login' },
    { path: '/me', component: Profile, name: 'auth.profile' }
]