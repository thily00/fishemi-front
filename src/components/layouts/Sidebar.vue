<template>
  <div class="w-60 min-h-[82vh] h-auto flex flex-col gap-4">
    <div class="bg-blue py-8 rounded-lg flex justify-center">
      <ul class="space-y-6">
        <li>
          <a
            href="#"
            class="flex items-center text-white hover:text-yellow-400"
          >
            <img
              src="/public/icons/sidebar/dashboardWhite.svg"
              alt="dashboard icon"
              class="w-6 h-6 mr-3"
            />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center text-white hover:text-yellow-400"
          >
            <img
              src="/public/icons/sidebar/emailWhite.svg"
              alt="campagnes icon"
              class="w-6 h-6 mr-3"
            />
            <span>Campagnes</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center text-white hover:text-yellow-400"
          >
            <img
              src="/public/icons/sidebar/usersWhite.svg"
              alt="Listes icon"
              class="w-6 h-6 mr-3"
            />
            <span>Listes</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center text-white hover:text-yellow-400"
          >
            <img
              src="/public/icons/sidebar/user.svg"
              alt="Employe icon"
              class="w-6 h-6 mr-3"
            />
            <span>Employés</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center text-white hover:text-yellow-400"
          >
            <img
              src="/public/icons/sidebar/settings.svg"
              alt="Settings icon"
              class="w-6 h-6 mr-3"
            />
            <span>Paramètres</span>
          </a>
        </li>
      </ul>
    </div>

    <div
      class="bg-blue p-8 rounded-lg mt-6 text-center text-white flex flex-col gap-4"
    >
      <p>Profitez de 10% de remise en ce moment</p>
      <FishemiButton label="C’est parti!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FishemiButton from "@/components/layouts/FishemiButton.vue";
</script>
