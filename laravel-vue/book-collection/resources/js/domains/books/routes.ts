import Overview from '@/domains/books/pages/Overview.vue';
import Create from '@/domains/books/pages/Create.vue';

export const bookRoutes =  [
    { path: '/books', component: Overview, name: 'books.index' },
    { path: '/books/create', component: Create, name: 'books.create' }
];