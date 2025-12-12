//import { type RouteRecordInfo } from 'vue-router';
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

// export interface RouteNamedMap {

//     home: RouteRecordInfo<
//         'home',
//         '/',
//         Record<never, never>,
//         Record<never, never>,
//         never
//     >

//     create: RouteRecordInfo<
//         'create',
//         '/create',
//         Record<never, never>,
//         Record<never, never>,
//         never
//     >

//     edit: RouteRecordInfo<
//         'edit',
//         '/edit/:id',
//         { id: number }, // parsed to?
//         { id: string }, // url value?
//         never
//     >

//     overview: RouteRecordInfo<
//         'overview',
//         '/overview',
//         Record<never, never>,
//         Record<never, never>,
//         never
//     >

//     order: RouteRecordInfo<
//         'order',
//         '/order',
//         Record<never, never>,
//         Record<never, never>,
//         never
//     >

// }

// declare module 'vue-router' {
//   interface TypesConfig {
//     RouteNamedMap: RouteNamedMap
//   }
// }
