import { createWebHistory, createRouter } from "vue-router";

import AboutView from "./AboutView.vue";
import HomView from "./HomView.vue";

const routes = [
    { path: "/", name: "home", component: HomView },
    { path: "/about", name: "about", component: AboutView },
];

const router = createRouter({
    history: createWebHistory("/vue"),
    routes,
});

export default router;