<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import { useAccountStore } from "@/stores/accountStore";
import { setAccessToken, setRefreshToken } from "@/services/AuthService";
import { axiosNotAuthInstance } from "@/services/AxiosService";

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
    const response = await axiosNotAuthInstance().get("/account/login", {
      params: {
        email: email,
        "otp-code": otpCode,
      },
    });

    setTimeout(() => {
      isLoading.value = false;

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      accountStore.setConnexionStatus(true);

      router.push("/dashboard");
    });
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
