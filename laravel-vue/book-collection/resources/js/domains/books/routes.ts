import Overview from '@/domains/books/pages/Overview.vue';
import Create from '@/domains/books/pages/Create.vue';
import Edit from '@/domains/books/pages/Edit.vue';
import Show from '@/domains/books/pages/Show.vue';

export const bookRoutes =  [
    { path: '/books', component: Overview, name: 'books.index' },
    { path: '/books/create', component: Create, name: 'books.create' },
    { path: '/books/:id', component: Show, name: 'books.show' },
    { path: '/books/:id/edit/', component: Edit, name: 'books.edit' }
];