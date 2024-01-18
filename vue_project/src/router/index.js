import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "*",
            name: "404",
            component: () => import("../views/404View.vue"),
        },
        {
            path: "/login",
            name: "Log In",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/",
            name: "Home",
            component: () => import("../views/HomeView.vue"),
        },
    ]
})

export default router