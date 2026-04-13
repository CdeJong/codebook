import './bootstrap';
import { createApp } from "vue";
import App from "@/App.vue";
import { router } from '@/router'
import { me } from '@/services/auth';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);

try {
    await me();
} catch (_) {
    // ignored...
} finally {
    app.use(router);
    app.mount("#app");
}


