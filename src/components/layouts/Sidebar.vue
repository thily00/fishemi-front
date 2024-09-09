<template>
  <div
    :class="[
      'fixed md:static md:flex',
      sidebarVisible ? 'block' : 'hidden',
      'w-60 min-h-[82vh] h-auto flex flex-col gap-4 bg-blue p-8 rounded-lg',
    ]"
  >
    <ul class="space-y-6">
      <li>
        <a href="#" class="flex items-center text-white hover:text-yellow-400">
          <img
            src="/icons/sidebar/dashboardWhite.svg"
            alt="dashboard icon"
            class="w-6 h-6 mr-3"
          />
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center text-white hover:text-yellow-400">
          <img
            src="/icons/sidebar/emailWhite.svg"
            alt="campagnes icon"
            class="w-6 h-6 mr-3"
          />
          <span>Campagnes</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center text-white hover:text-yellow-400">
          <img
            src="/icons/sidebar/usersWhite.svg"
            alt="Listes icon"
            class="w-6 h-6 mr-3"
          />
          <span>Listes</span>
        </a>
      </li>
      <li>
        <router-link to="/mes-employes" class="flex items-center text-white hover:text-yellow-400">
          <img
            src="/icons/sidebar/user.svg"
            alt="Employe icon"
            class="w-6 h-6 mr-3"
          />
          <span>Employés</span>
        </router-link>
      </li>
      <li>
        <a href="#" class="flex items-center text-white hover:text-yellow-400">
          <img
            src="/icons/sidebar/settings.svg"
            alt="Settings icon"
            class="w-6 h-6 mr-3"
          />
          <span>Paramètres</span>
        </a>
      </li>
    </ul>

    <div class="mt-6 text-center text-white flex flex-col gap-4">
      <p>Profitez de 10% de remise en ce moment</p>
      <FishemiButton label="C’est parti!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FishemiButton from "@/components/layouts/FishemiButton.vue";

const props = defineProps({
  sidebarVisible: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
