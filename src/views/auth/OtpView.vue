<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import { useAccountStore } from "@/stores/accountStore";

const accountStore = useAccountStore();
const isLoading = ref(true);
const router = useRouter();
const route = useRoute();

const login = async () => {
  const email = route.query.email as string | null;
  const otpCode = route.query.token as string | null;

  if (!email || !otpCode) {
    console.error("Email ou code OTP manquant.");
    isLoading.value = false;
    return;
  }

  try {
    const response: any = await accountStore.login({ email, otpCode });
    if (response && response?.status === 200) {
      isLoading.value = false;
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    isLoading.value = false;
  }
};

onMounted(() => {
  login();
});
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <ProgressSpinner v-if="isLoading" />
    <div v-else>
      <h1>Connexion réussie, redirection en cours...</h1>
    </div>
  </div>
</template>
