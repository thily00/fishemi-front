<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterView } from "vue-router";
import FishemiHeader2 from "@/components/layouts/headers/FishemiHeader2.vue";
import Sidebar from "@/components/layouts/FishemiSidebar.vue";
import { useRoute } from "vue-router";
import Toast from "primevue/toast";

const route = useRoute();
const isDarkMode = ref(true);

const showAppLayout = computed(() => {
  return (
    !route.path.includes("/login") &&
    !route.path.includes("/register") &&
    !route.path.includes("/otp") &&
    route.path !== "/"
  );
});

const autoWidth = computed(() => {
  if (
    !route.path.includes("/login") &&
    !route.path.includes("/register") &&
    !route.path.includes("/otp") &&
    route.path !== "/"
  ) {
    return "w-full md:w-[calc(100%-15rem)] md:ml-[17rem]";
  } else {
    return "w-full";
  }
});
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <div class="dark:bg-background w-full min-h-screen">
      <div class="w-full mx-auto xl:px-12 px-6">
        <FishemiHeader2 v-if="showAppLayout" />
        <div class="flex gap-8 pt-8">
          <Sidebar v-if="showAppLayout" />
          <div :class="autoWidth">
            <RouterView />
          </div>
        </div>
      </div>
      <Toast />
    </div>
  </div>
</template>
