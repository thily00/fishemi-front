<script setup lang="ts">
import FishemiButton from "../FishemiButton.vue";
import { useRouter } from 'vue-router';
import { isAuthenticated } from "@/services/AuthService";

const router = useRouter();
const goToLogin = async () => {
  if (await isAuthenticated()) {
    await router.push("/dashboard");
  } else {
    await router.push("/login");
  }
};

</script>
<template>
  <div class="w-full flex justify-between py-8">
    <span class="flex items-center gap-2">
      <img src="/logo.png" class="w-10" alt="logo" />
      <p class="text-base text-white">Fishemi.io</p>
    </span>

    <FishemiButton label="Espace client" :action="goToLogin"  />
  </div>
</template>
