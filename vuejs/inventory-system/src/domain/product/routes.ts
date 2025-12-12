import HomePage from '@/domain/product/page/HomePage.vue';
import CreatePage from '@/domain/product/page/CreatePage.vue';
import EditPage from '@/domain/product/page/EditPage.vue';
import OverviewPage from '@/domain/product/page/OverviewPage.vue';
import OrderPage from '@/domain/product/page/OrderPage.vue';


export const routes = [
    {path: '/', component: HomePage},
    {path: '/create', component: CreatePage},
    {path: '/edit/:id', component: EditPage},
    {path: '/overview', component: OverviewPage},
    {path: '/order', component: OrderPage},
];
