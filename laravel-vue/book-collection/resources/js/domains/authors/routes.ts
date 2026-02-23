import Overview from '@/domains/authors/pages/Overview.vue';
import Create from '@/domains/authors/pages/Create.vue';
import Edit from '@/domains/authors/pages/Edit.vue';

export const authorRoutes =  [
    { path: '/authors', component: Overview, name: 'authors.index' },
    { path: '/authors/create', component: Create, name: 'authors.create' },
    { path: '/authors/:id/edit/', component: Edit, name: 'authors.edit' }
];