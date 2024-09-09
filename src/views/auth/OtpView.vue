<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import {setAccessToken, setRefreshToken} from "@/services/AuthService";
import {axiosNotAuthInstance} from "@/services/AxiosService";

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
    const response = await axiosNotAuthInstance().get(
      "/account/login",
      {
        params: {
          email: email.value,
          "otp-code": otpCode.value,
        },
      }
    );

    setTimeout(() => {
      isLoading.value = false;

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      router.push("/dashboard");
    }, 3000);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    isLoading.value = false;
  }
};

onMounted(() => {
  email.value = route.query.email as string | null;
  otpCode.value = route.query.token as string | null;

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
