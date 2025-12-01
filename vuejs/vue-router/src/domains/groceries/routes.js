import Create from "@/domains/groceries/pages/Create.vue";
import Edit from "@/domains/groceries/pages/Edit.vue";
import Overview from "@/domains/groceries/pages/Overview.vue";

export const routes = [
    { path: '/', component: Overview },
    { path: '/create', component: Create },
    { path: '/edit', component: Edit },
    { path: '/overview', component: Overview },
];

