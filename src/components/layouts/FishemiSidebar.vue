<template>
  <div
    :class="[
      'fixed md:flex',
      props.sidebarVisible ? 'block' : 'hidden',
      'w-60 min-h-[82vh] h-auto flex flex-col gap-4',
    ]"
  >
    <ul class="space-y-4 bg-blue rounded-lg p-8">
      <li v-for="item in menuItems" :key="item.name">
        <router-link
          :to="item.to"
          class="flex items-center text-white hover:text-yellow-400"
          :class="{ 'text-yellow-400': isActive(item.to) }"
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

const route = useRoute();
const menuItems = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: "/public/icons/sidebar/dashboardWhite.svg",
  },
  {
    name: "Campagnes",
    to: "/campagnes",
    icon: "/public/icons/sidebar/emailWhite.svg",
  },
  {
    name: "Listes",
    to: "/mes-listes",
    icon: "/public/icons/sidebar/usersWhite.svg",
  },
  {
    name: "Employés",
    to: "/mes-employes",
    icon: "/public/icons/sidebar/user.svg",
  },
  {
    name: "Paramètres",
    to: "/parametres",
    icon: "/public/icons/sidebar/settings.svg",
  },
];

const isActive = (path: string) => route.path === path;

const props = defineProps({
  sidebarVisible: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
