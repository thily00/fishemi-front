<script setup lang="ts">
import Menu from "primevue/menu";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ref, defineEmits, computed, onMounted } from "vue";
import { useAccountStore } from "@/stores/accountStore";
import { logOut } from "@/services/AuthService";

const route = useRoute();
const emit = defineEmits(["toggle-sidebar"]);
const router = useRouter();
const accountStore = useAccountStore();
const sidebarVisible = ref(false);
const menu = ref();
const items = ref([
  {
    items: [
      {
        label: "Se déconnecter",
        icon: "pi pi-sign-out",
        command: () => {
          logOut();
        },
      },
    ],
  },
]);

const menuItems = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: "/icons/sidebar/dashboardWhite.svg",
  },
  {
    name: "Campagnes",
    to: "/campagnes",
    icon: "/icons/sidebar/emailWhite.svg",
  },
  {
    name: "Listes",
    to: "/mes-listes",
    icon: "/icons/sidebar/usersWhite.svg",
  },
  {
    name: "Employés",
    to: "/mes-employes",
    icon: "/icons/sidebar/user.svg",
  },
  {
    name: "Paramètres",
    to: "/parametres",
    icon: "/icons/sidebar/settings.svg",
  },
];
const isActive = (path: string) => route.path === path;

onMounted(() => {
  if (!accountStore.account) {
    accountStore.me();
  }
});

const capitalizedFullName = computed(() => {
  const fullName = accountStore.account?.full_name || "";
  return fullName.charAt(0).toUpperCase();
});

const redirecTo = (pagename: string) => {
  router.push(`/${pagename}`);
};

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
  emit("toggle-sidebar", sidebarVisible.value);
};
</script>

<template>
  <div
    class="sticky z-50 w-full top-0 h-20 shadow-2xl flex items-center justify-between p-8 md:p-12 bg-blue rounded-b-2xl"
  >
    <div
      class="flex items-center gap-2 cursor-pointer"
      @click="redirecTo('dashboard')"
    >
      <img src="/logo-alt.png" class="w-8 md:w-10" alt="logo" />
      <p class="text-base text-white">Fishemi.io</p>
    </div>

    <div class="flex items-center gap-4">
      <div class="md:hidden" @click="toggleSidebar">
        <svg
          class="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
      <div
        class="hidden md:flex items-center gap-4 cursor-pointer"
        @click="toggleMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <div class="text-right text-white">
          <p class="mb-0 text-xl fishemi-text-color">
            {{ accountStore.account?.full_name }}
          </p>
          <p class="mb-0 text-md font-light">
            {{ accountStore.account?.role }}
          </p>
        </div>
        <div
          class="w-8 md:w-10 h-8 md:h-10 primary rounded-full flex justify-center items-center"
        >
          <p class="mb-0 font-normal text-xl">{{ capitalizedFullName }}</p>
        </div>
      </div>
      <Menu
        ref="menu"
        id="overlay_menu"
        :model="items"
        :popup="true"
        :pt="{ root: 'bg-blue shadow-2xl' }"
      />
    </div>
  </div>
  <transition name="slide">
    <div
      v-if="sidebarVisible"
      class="fixed top-0 left-0 z-50 w-64 h-full bg-blue text-white p-4 shadow-lg"
    >
      <div class="flex justify-between items-center">
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="redirecTo('dashboard')"
        >
          <img src="/logo-alt.png" class="w-8 md:w-10" alt="logo" />
          <p class="text-base text-white">Fishemi.io</p>
        </div>
        <button @click="toggleSidebar" class="text-2xl">&times;</button>
      </div>

      <div class="mt-8">
        <div class="mb-4">
          <p class="text-lg fishemi-text-color">
            {{ accountStore.account?.full_name }}
          </p>
          <p class="text-sm font-light">{{ accountStore.account?.role }}</p>
        </div>
        <ul>
          <li
            v-for="item in items[0].items"
            :key="item.label"
            class="mb-4 cursor-pointer"
            @click="item.command"
          >
            <i :class="item.icon"></i> {{ item.label }}
          </li>
        </ul>
      </div>
      <ul class="space-y-4 bg-blue rounded-lg pt-8">
        <li v-for="item in menuItems" :key="item.name">
          <router-link
            :to="item.to"
            class="flex items-center text-white hover:fishemi-text-color"
            :class="{ 'fishemi-text-color': isActive(item.to) }"
          >
            <img
              :src="item.icon"
              alt="`${item.name}` icon"
              class="w-6 h-6 mr-3"
            />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
