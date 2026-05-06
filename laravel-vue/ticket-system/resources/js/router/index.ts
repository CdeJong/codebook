import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ticketRoutes } from '@/domains/tickets/routes';
import { authRoutes } from '@/domains/authentication/routes';
import { getLoggedInUser, isLoggedIn } from '@/services/auth';
import NotFound from './NotFound.vue';
import { categoryRoutes } from '@/domains/categories/routes';
import { userRoutes } from '@/domains/users/routes';

interface CustomData {
    requiresGuest?: boolean,
    requiresAuth?: boolean,
    requiresAdmin?: boolean
}

declare module 'vue-router' {
    interface RouteMeta extends CustomData {}
}

export function createRoute(
    path : string, 
    component : any, 
    name: string, 
    meta : CustomData = { requiresAuth: true, requiresGuest: false, requiresAdmin: false }
) : RouteRecordRaw {
    const resolvedMeta = { 
        requiresAuth: true,
        requiresGuest: false,
        requiresAdmin: false, 
        ...meta 
    };
    return { 
        path: path, 
        component: component, 
        name: name, 
        meta: resolvedMeta
    }
}

const homeRoute = {
    path: '/',
    name: 'home',
    redirect: () => {
        return isLoggedIn.value ? { name: 'tickets.index' } : { name: 'auth.login' }
    }
}

const pageNotFoundRoute = createRoute( 
    '/:pathMatch(.*)*', 
    NotFound, 
    'notfound', 
    { requiresAuth: false, requiresGuest: false, requiresAdmin: false } 
);

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authRoutes,
        ...ticketRoutes,
        ...categoryRoutes,
        ...userRoutes,
        homeRoute,
        pageNotFoundRoute
    ]
});

router.beforeEach((to, _) => {
    const user = getLoggedInUser.value;

    if(!to.meta) {
        return true; // should not be possible if createRoute is used everywhere, and the home redirect
    }

    if (to.meta.requiresAdmin) {
        if (!user) {
            return { name: 'auth.login', query: { redirect: to.fullPath } }
        }

        if (!user.is_admin) {
            return { name: 'notfound' } // todo change this to something else?
        }

        return true; // logged in admin
    }

    if (to.meta.requiresAuth && !user) {
        return { name: 'auth.login', query: { redirect: to.fullPath } };
    } 
    
    if (to.meta.requiresGuest && user) {
        return { name: 'auth.profile' };
    }

    // public pages, or actor is allowed on this page in the current context
    return true;
});