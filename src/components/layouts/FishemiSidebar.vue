<template>
  <div
    :class="[
      'fixed md:flex',
      props.sidebarVisible ? 'block' : 'hidden',
      'w-60 min-h-[82vh] h-auto flex flex-col gap-4',
    ]"
  >
    <ul class="space-y-4 bg-blue rounded-lg p-8">
      <li v-for="item in filteredMenuItems" :key="item.name">
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

    <div
      class="mt-4 text-center text-white flex flex-col items-center gap-4 bg-blue rounded-lg p-8"
    >
      <p>Profitez de 10% de remise en ce moment</p>
      <FishemiButton label="C’est parti!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import { useAccountStore } from "@/stores/accountStore";
import { computed, defineProps } from "vue";

const accountStore = useAccountStore();
const route = useRoute();
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

const props = defineProps({
  sidebarVisible: {
    type: Boolean,
    default: false,
  },
});

const filteredMenuItems = computed(() => {
  return menuItems.filter(item => {
    if (item.name === "Paramètres" && !accountStore.isAdmin) {
      return false; 
    }
    return true;
  });
});
</script>

<style scoped></style>
