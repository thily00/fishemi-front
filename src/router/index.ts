import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Auth/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/app/Dashboard.vue"),
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/Auth/RegisterView.vue"),
    },
    {
      path: '/home',
      redirect: '/',
    }
  ],
});

export default router;
