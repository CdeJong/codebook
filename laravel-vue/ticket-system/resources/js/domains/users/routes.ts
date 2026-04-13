import Overview from "@/domains/users/pages/Overview.vue";
import Edit from "@/domains/users/pages/Edit.vue";
import { createRoute } from "@/router";

export const userRoutes = [
    createRoute('/users', Overview, 'users.index', { requiresAdmin: true }),
    createRoute('/users/:id/edit', Edit, 'users.edit', { requiresAdmin: true })
];