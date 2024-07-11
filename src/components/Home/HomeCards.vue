<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  percentage: String,
  logo: String,
});

const isLargeText = computed(() => {
  return /^[0-9.,$€%\s]+$/.test(props.percentage);
});
</script>

<template>
  <div class="bg-blue p-6 rounded-md text-grey">
    <div class="mb-4" v-if="logo">
      <img :src="logo" alt="logo" class="" />
    </div>
    <p
      v-else
      :class="[
        isLargeText
          ? 'text-4xl sm:text-6xl md:text-7xl lg:text:8xl'
          : 'text-2xl sm:text-2xl md:text-4xl',
        'font-bold',
        'fishemi-text-color',
      ]"
    >
      {{ percentage }}
    </p>
    <p class="mt-2">{{ title }}</p>
  </div>
</template>
