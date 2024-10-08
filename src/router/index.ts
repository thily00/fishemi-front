import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/services/AuthService";
import { useAccountStore } from "@/stores/accountStore";

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
      path: "/parametres",
      name: "parametres",
      component: () => import("@/views/app/SettingsView.vue"),
    },
    {
      path: "/mes-listes",
      name: "listes",
      component: () => import("@/views/app/ListsView.vue"),
    },
    {
      path: "/campagnes",
      name: "campagnes",
      component: () => import("@/views/app/CampaignView.vue"),
    },
    {
      path: "/campagnes/nouvelle-campagne",
      name: "nouvelle-campagne",
      component: () => import("@/views/app/CampaignManager.vue"),
    },
    {
      path: "/campagnes/modifier-campagne/:id",
      name: "edit-campaign",
      component: () => import("@/views/app/CampaignManager.vue"),
      props: true,
    },
    {
      path: "/campaign/payment-confirmation",
      name: "payment-confirmation",
      component: () => import("@/views/app/CampaignPaymentConfirmation.vue"),
    },
    {
      path: "/campaign/payment-cancellation",
      name: "payment-cancellation",
      component: () => import("@/views/app/CampaignPaymentCancellation.vue"),
    },
    {
      path: "/campagnes/:id/resultats",
      name: "campaignResults",
      component: () => import("@/views/app/CampaignResultsView.vue"),
      props: true,
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const onlyForNonAuthenticated = ["login", "register", "otp"];
  const accountStore = useAccountStore();

  if (to.name === "home") {
    // if request is for "home", both authenticated and non-authenticated has access
    next();
  } else {
    const isAuth = await isAuthenticated();
    const isAdmin = accountStore.isAdmin;

    if (!isAuth && !onlyForNonAuthenticated.includes(to.name as string)) {
      // not authenticated but want access to authenticated page
      next({ name: "login" });
    } else if (isAuth && onlyForNonAuthenticated.includes(to.name as string)) {
      // authenticated but want access to non-authenticated page
      next({ name: from.name as string });
    } else {
      // authenticated
      if(to.name === "parametres" && !isAdmin) { // if user is not admin, redirect to dashboard
        next({ name: "dashboard" });
      }else {
      next();
      }
    }
  }
});


export default router;
