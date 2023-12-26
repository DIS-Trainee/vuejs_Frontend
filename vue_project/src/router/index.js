import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
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
];