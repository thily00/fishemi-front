<script setup lang="ts">
import Menu from "primevue/menu";
import { useRouter } from "vue-router";
import { ref, defineEmits, computed } from "vue";
import { useAccountStore } from "@/stores/accountStore";

const emit = defineEmits(["toggle-sidebar"]);
const router = useRouter();
const accountStore = useAccountStore();
const sidebarVisible = ref(false);
const menu = ref();
const items = ref([
  {
    items: [
      {
        label: "Profil",
        icon: "pi pi-user",
      },
      {
        label: "Se déconnecter",
        icon: "pi pi-sign-out",
        command: () => {
          console.log("logout");
          accountStore.logout();
        },
      },
    ],
  },
]);

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
    class="w-full h-20 flex items-center justify-between p-8 md:p-12 bg-blue rounded-b-3xl mb-12"
  >
    <div
      class="flex items-center gap-2 cursor-pointer"
      @click="redirecTo('dashboard')"
    >
      <img src="/logo-alt.png" class="w-8 md:w-10" alt="logo" />
      <p class="text-base text-white">Fishemi.io</p>
    </div>

    <div class="flex items-center gap-4">
      <!-- Menu burger icon for mobile view -->
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
</template>

<style scoped></style>
