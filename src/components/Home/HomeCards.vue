<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  title: String,
  content: String,
  percentage: String,
  logo: String, // Ajoutez une nouvelle prop pour le logo
});

const isLargeText = computed(() => {
  // Vérifie si la chaîne contient uniquement des chiffres, %, $ ou €
  return /^[0-9$€%]+$/.test(props.percentage);
});
</script>

<template>
  <div class="bg-gray-800 p-6 rounded-md text-white">
    <div v-if="logo">
      <img :src="logo" alt="logo" class="h-12 w-12" />
      <!-- Ajustez la taille du logo selon vos besoins -->
    </div>
    <p
      v-else
      :class="[
        isLargeText ? 'text-8xl' : 'text-4xl',
        'font-bold',
        'text-yellow-400',
      ]"
    >
      {{ percentage }}
    </p>
    <p class="mt-2">{{ title }}</p>
    <p class="mt-2">{{ content }}</p>
  </div>
</template>
