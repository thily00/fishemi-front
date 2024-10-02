<template>
  <div class="md:hidden">
    <button @click="toggleMenu" class="p-4 focus:outline-none">
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>
    <div
      v-if="isMenuOpen"
      class="absolute top-0 left-0 w-full bg-blue shadow-lg z-20"
    >
      <ul class="flex flex-col space-y-4 p-4">
        <li>
          <a
            href="#"
            class="text-white hover:fishemi-text-color flex items-center"
          >
            <img
              src="/icons/sidebar/dashboardWhite.svg"
              alt="dashboard icon"
              class="w-6 h-6 mr-3"
            />
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            class="text-white hover:fishemi-text-color flex items-center"
          >
            <img
              src="/icons/sidebar/emailWhite.svg"
              alt="campagnes icon"
              class="w-6 h-6 mr-3"
            />
            Campagnes
          </a>
        </li>
        <li>
          <a
            href="#"
            class="text-white hover:fishemi-text-color flex items-center"
          >
            <img
              src="/icons/sidebar/usersWhite.svg"
              alt="Listes icon"
              class="w-6 h-6 mr-3"
            />
            Listes
          </a>
        </li>
        <li>
          <a
            href="#"
            class="text-white hover:fishemi-text-color flex items-center"
          >
            <img
              src="/icons/sidebar/user.svg"
              alt="Employe icon"
              class="w-6 h-6 mr-3"
            />
            Employés
          </a>
        </li>
        <li>
          <a
            href="#"
            class="text-white hover:fishemi-text-color flex items-center"
          >
            <img
              src="/icons/sidebar/settings.svg"
              alt="Settings icon"
              class="w-6 h-6 mr-3"
            />
            Paramètres
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>
