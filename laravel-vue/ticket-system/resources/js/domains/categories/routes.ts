import Overview from "@/domains/categories/pages/Overview.vue";
import Create from "@/domains/categories/pages/Create.vue";
import Edit from "@/domains/categories/pages/Edit.vue";
import { createRoute } from "@/router";

export const categoryRoutes = [
    createRoute('/categories', Overview, 'categories.index', { requiresAdmin: true }),
    createRoute('/categories/create', Create, 'categories.create', { requiresAdmin: true }),
    createRoute('/categories/:id/edit', Edit, 'categories.edit', { requiresAdmin: true })
]