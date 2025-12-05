import HomePage from "@/domains/groceries/pages/HomePage.vue";
import CreatePage from "@/domains/groceries/pages/CreatePage.vue";
import EditPage from "@/domains/groceries/pages/EditPage.vue";
import OverviewPage from "@/domains/groceries/pages/OverviewPage.vue";

export const routes = [
    { path: '/', component: HomePage },
    { path: '/create', component: CreatePage },
    { path: '/edit/:id', component: EditPage },
    { path: '/overview', component: OverviewPage }
];

