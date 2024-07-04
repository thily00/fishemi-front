<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";

const isDarkMode = ref(true);
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <div class="dark:bg-background">
      <RouterView />
    </div>
  </div>
</template>
