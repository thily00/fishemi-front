<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import Message from "primevue/message";
import {axiosNotAuthInstance} from "@/services/AxiosService";

const emit = defineEmits(["redirect-to"]);

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true,
  },
});

const redirectTo = (pagename: string) => {
  if (pagename === "authScreen") {
    pagename = props.isLogin ? "register" : "login";
  }

  emit("redirect-to", pagename);
};

const email = ref("");
const fullName = ref("");
const companyName = ref("");

const successMessage = ref("");
const errorMessage = ref("");

const validateFields = () => {
  if (
    !email.value ||
    (!props.isLogin && (!fullName.value || !companyName.value))
  ) {
    errorMessage.value = "Tous les champs doivent être remplis.";
    return false;
  }
  return true;
};

const handleSignup = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!validateFields()) {
    return;
  }

  const payload = {
    email: email.value,
    user_full_name: fullName.value,
    company_name: companyName.value,
  };

  try {
    await axiosNotAuthInstance().post(
      "/account/signup",
      payload
    );
    successMessage.value =
      "Inscription réussie ! Veuillez vérifier votre email.";
  } catch (error: any) {
    if (error.response && error.response.data) {
      if (error.response.status === 409) {
        errorMessage.value = "Un compte avec cet e-mail existe déjà.";
      } else {
        errorMessage.value =
          error.response.data.message || "Une erreur s'est produite.";
      }
    } else {
      errorMessage.value = "Une erreur inconnue s'est produite.";
    }
  }
};

const handleLogin = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!validateFields()) {
    return;
  }

  try {
    await axiosNotAuthInstance().get(
      "/account/sendOtp",
      {
        params: {
          email: email.value,
        },
      }
    );

    successMessage.value =
      "Connexion réussie ! Veuillez vérifier votre email pour le code OTP.";
  } catch (error: any) {
    if (error.response && error.response.data) {
      if (error.response.status === 400) {
        errorMessage.value =
          "Erreur lors de la connexion. Vérifiez votre email.";
      } else {
        errorMessage.value =
          error.response.data.message || "Une erreur s'est produite.";
      }
    } else {
      errorMessage.value = "Une erreur inconnue s'est produite.";
    }
  }
};

const handleSubmit = () => {
  if (props.isLogin) {
    handleLogin();
  } else {
    handleSignup();
  }
};
</script>

<template>
  <div class="rounded-xl p-10 flex flex-col justify-between bg-blue w-full">
    <p
      class="fishemi-text-color font-bold xl:text-5xl lg:text-4xl md:text-3xl xs:text-2xl text-2xl mb-8"
    >
      {{
        props.isLogin ? "Connectez-vous à votre compte" : "Créez votre compte"
      }}
    </p>

    <div v-if="successMessage" class="mb-4">
      <Message severity="success">{{ successMessage }}</Message>
    </div>
    <div v-if="errorMessage" class="mb-4">
      <Message severity="error">{{ errorMessage }}</Message>
    </div>

    <div class="flex flex-col gap-2 text-white">
      <div v-if="!props.isLogin" class="flex flex-col gap-2 text-white">
        <label for="fullName">Nom complet</label>
        <InputText
          id="fullName"
          v-model="fullName"
          class="mb-2 bg-background border-slate-700"
        />
      </div>

      <div class="flex flex-col gap-2 text-white">
        <label for="email">E-mail</label>
        <InputText
          id="email"
          v-model="email"
          class="mb-2 bg-background border-slate-700"
        />
      </div>

      <div v-if="!props.isLogin" class="flex flex-col gap-2 text-white">
        <label for="companyName">Nom de votre entreprise</label>
        <InputText
          id="companyName"
          v-model="companyName"
          class="mb-2 bg-background border-slate-700"
        />
      </div>

      <div>
        <FishemiButton
          :label="props.isLogin ? 'Connexion' : 'Inscription'"
          :fullWidth="true"
          :action="handleSubmit"
        />
        <p class="mt-3 cursor-pointer">
          {{
            props.isLogin
              ? "Vous n'avez pas de compte ?"
              : "Vous avez déjà un compte ?"
          }}
          <span
            class="fishemi-text-color font-bold"
            @click="redirectTo('authScreen')"
            >{{ props.isLogin ? "S'inscrire" : "Se connecter" }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
