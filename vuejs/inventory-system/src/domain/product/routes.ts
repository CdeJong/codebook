import HomePage from '@/domain/product/page/HomePage.vue';
import CreatePage from '@/domain/product/page/CreatePage.vue';
import EditPage from '@/domain/product/page/EditPage.vue';
import OverviewPage from '@/domain/product/page/OverviewPage.vue';
import OrderPage from '@/domain/product/page/OrderPage.vue';


export const routes = [
    {path: '/', component: HomePage, name: 'product.home'},
    {path: '/create', component: CreatePage, name: 'product.create'},
    {path: '/edit/:id', component: EditPage, name: 'product.edit'},
    {path: '/overview', component: OverviewPage, name: 'product.overview'},
    {path: '/order', component: OrderPage, name: 'product.order'},
];
