import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/RegisterView.vue"),
    },
    {
      path: "/otp",
      name: "otp",
      component: () => import("@/views/auth/OtpView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/app/DashboardView.vue"),
    },
    {
      path: "/mes-employes",
      name: "employees",
      component: () => import("@/views/app/EmployeesView.vue"),
    },
    {
      path: "/mes-listes",
      name: "listes",
      component: () => import("@/views/app/ListsView.vue"),
    },
  ],
});


router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/register", "/otp"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("accessToken");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
