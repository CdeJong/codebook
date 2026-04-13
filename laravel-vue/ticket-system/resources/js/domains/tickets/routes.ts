import Overview from '@/domains/tickets/pages/Overview.vue';
import Create from '@/domains/tickets/pages/Create.vue';
import Edit from '@/domains/tickets/pages/Edit.vue';
import Show from '@/domains/tickets/pages/Show.vue';
import { createRoute } from '@/router';

export const ticketRoutes = [
    createRoute('/tickets', Overview, 'tickets.index'),
    createRoute('/tickets/create',  Create, 'tickets.create'),
    createRoute('/tickets/:id', Show, 'tickets.show'),
    createRoute('/tickets/:id/edit/', Edit, 'tickets.edit')
];