<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";

const isLoading = ref(true);
const router = useRouter();
const route = useRoute();

const email = ref<string | null>(null);
const otpCode = ref<string | null>(null);

const login = async () => {
  if (!email.value || !otpCode.value) {
    console.error("Email ou code OTP manquant.");
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      "https://preprod.api.fishemi.ilies.ch/account/login",
      {
        params: {
          email: email.value,
          "otp-code": otpCode.value,
        },
      }
    );

    // Simuler un délai de 3 secondes avant de rediriger
    setTimeout(() => {
      isLoading.value = false; // Arrêter le loader

      // Sauvegarder les tokens si besoin
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      // Rediriger l'utilisateur après le succès du login
      router.push("/dashboard"); // Modifier la route selon votre application
    }, 3000);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    isLoading.value = false; // Arrêter le loader même en cas d'erreur
  }
};

onMounted(() => {
  // Récupérer les paramètres email et token de l'URL
  email.value = route.query.email as string | null;
  otpCode.value = route.query.token as string | null;

  // Appeler l'API de login
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
