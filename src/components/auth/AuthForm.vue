<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import FishemiButton from "@/components/layouts/FishemiButton.vue";

const emit = defineEmits(["redirect-to"]);

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true,
  },
});

const redirectTo = (pagename: string) => {
  if (pagename === 'authScreen') {
    pagename = props.isLogin ? "register" : "login";
  }

  emit("redirect-to", pagename);
};

const email = ref("");
const fullName = ref("");
const companyName = ref("");

const handleSubmit = async () => {
  const payload = {
    email: email.value,
    user_full_name: fullName.value,
    company_name: companyName.value,
  };

  try {
    const response = await axios.post(
      "https://preprod.api.fishemi.ilies.ch/account/signup",
      payload
    );
    console.log(response.data);
    redirectTo("dashboard");
  } catch (error) {
    console.error(error);
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

    <div class="flex flex-col gap-2 text-white">
      <div class="flex flex-col gap-2 text-white" v-if="!props.isLogin">
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

      <div class="flex flex-col gap-2 text-white" v-if="!props.isLogin">
        <label for="companyName">Nom de votre entreprise</label>
        <InputText
          id="companyName"
          v-model="companyName"
          class="mb-2 bg-background border-slate-700"
        />
      </div>

      <div>
        <FishemiButton
          label="Connexion"
          :fullWidth=true
          :action="handleSubmit"
        />
        <p class="mt-3 cursor-pointer">
          {{
            props.isLogin
              ? "Vous n'avez pas de compte ?"
              : "Vous avez déja un compte ?"
          }}
          <span class="fishemi-text-color font-bold" @click="redirectTo('authScreen')">{{
            props.isLogin ? "S'inscrire" : "Se connecter"
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
