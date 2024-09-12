<template>
  <div class="flex justify-between gap-4">
    <div class="bg-background w-1/3 pb-4 pl-4 pt-8 rounded-md">
      <h2 class="text-4xl font-bold mb-2 fishemi-text-color">
        {{ stats.total_sent }}
      </h2>
      <p class="text-md mb-4 text-white">Mails</p>
      <p class="text-sm text-grey">On été envoyés avec succès</p>
    </div>
    <div class="bg-background w-1/3 pb-4 pl-4 pt-8 rounded-md">
      <h2 class="text-4xl font-bold mb-2 fishemi-text-color">
        {{ stats.total_opened }}
      </h2>
      <p class="text-md mb-4 text-white">Utilisateurs</p>
      <p class="text-sm text-grey">On été envoyés avec succès</p>
    </div>
    <div class="bg-background w-1/3 pb-4 pl-4 pt-8 rounded-md">
      <h2 class="text-4xl font-bold mb-2 fishemi-text-color">
        {{ stats.total_clicked }}
      </h2>
      <p class="text-md mb-4 text-white">Utilisateurs</p>
      <p class="text-sm text-grey">On été envoyés avec succès</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>
