<script setup lang="ts">
import FishemiHeader from "../layouts/headers/FishemiHeader.vue";
import FishemiButton from "../layouts/FishemiButton.vue";
import Card from "../home/HomeCards.vue";

import { useRouter } from "vue-router";

const router = useRouter();
const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="w-full">
    <FishemiHeader />
    <div class="relative">
      <img
        src="/bg-frame/bg.png"
        alt="map background"
        class="w-100 h-auto m-auto top-[90px] object-cover absolute inset-0 z-0 hidden md:block"
      />
      <div class="grid md:grid-cols-6 gap-4 pt-8 relative z-10">
        <div class="col-start-2 col-span-4">
          <div class="text-hero text-center relative z-10">
            <h1
              class="text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] font-['Aeonik'] font-black pb-4 text-white"
            >
              Simuler des attaques phishing pour sensibiliser vos employés
            </h1>
            <h2
              class="text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2vw] font-['Aeonik'] pb-4 text-grey"
            >
              Découvrez Fishemi et simulez des attaques phishing personnalisées.
              Sécurisez votre entreprise avec nos solutions intelligentes et
              restez toujours un pas en avant des menaces
            </h2>
            <div class="flex justify-center">
              <FishemiButton
                label="Inscrire mon organisation"
                :action="goToRegister"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto p-4 z-1 mt-12 md:mt-24 relative">
      <!-- Première ligne -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        <Card
          class="col-span-1 md:col-span-2"
          percentage="80%"
          title="Des attaques de cybersécurité réussies sont des attaques de type phishing"
        />
        <Card
          class="col-span-1"
          percentage="3,99€"
          title="C'est le prix HT par employés que coûte une simulation d'attaque Fishemi"
        />
      </div>

      <!-- Deuxième ligne -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-4 md:mt-10"
      >
        <Card
          class="col-span-1"
          percentage="Une tarification comme bon vous semble"
          title="Profitez d’une tarification “pay-as-go” et payez uniquement à chaque campagne lancée. Ainsi, si vous voulez lancer une simulation d’attaque avec 20 employés, vous ne payerez que 79,80 € (H.T)"
        />
        <Card
          class="col-span-1"
          title="Nous prenons en charge les suites professionnelles Office 365 et Google Workspace afin de pouvoir fournir des templates d’e-mail de phishing ultra-réaliste en utilisant l’intelligence artificielle."
          logo="/logo-google.png"
        />
      </div>

      <!-- Troisième ligne -->
      <div class="grid grid-cols-1 gap-4 md:gap-10 mt-4 md:mt-10">
        <Card
          class="col-span-1"
          percentage="$43 000 000 000"
          title="Les pertes liées aux phishing en 2022 sont estimées à plus de 43 milliards de dollars"
        />
      </div>

      <!-- Quatrième ligne -->
      <div class="grid grid-cols-1 gap-4 md:gap-10 mt-4 md:mt-10">
        <div id="testimonial" class="flex w-full rounded-md items-center justify-center">
          <a href="https://www.youtube.com/?gl=CH" class="flex flex-col items-center justify-center gap-3 p-5" target="_blank" rel="noreferrer nofollow">
            <img src="/icons/play.svg" alt="Lancer la vidéo" />
            <span class="text-2xl sm:text-2xl md:text-4xl fishemi-text-color">Découvrez comment Hetic a intégré Fishemi</span>
          </a>
        </div>
      </div>

      <!-- Cinquième ligne -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mt-4 md:mt-10 mb-12 md:mb-24"
      >
        <div
          class="col-span-1 md:col-span-2 custom-card p-6 rounded-md text-background text-center cursor-pointer"
          @click="goToRegister"
        >
          <p class="text-3xl text-blue">L'inscription est 100% gratuite</p>
          <div class="mt-4 md:mt-10 px-4 py-3 bg-blue rounded-lg inline-block">
            <p class="fishemi-text-color font-normal">M'inscrire</p>
          </div>
        </div>
        <Card
          class="col-span-1"
          title="27 bis rue du Progrès - 93100 Montreuil Fishemi © - 2024"
        />
      </div>
    </div>
  </div>
</template>

<style>
.custom-card {
  background: radial-gradient(circle, #e9ff90 0%, #ccff00 40%);
}
#testimonial {
  position: relative;
  background: url('/interview-bg.jpg');
  background-size: cover;
  height: 500px;
}
#testimonial:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background: radial-gradient(rgba(16, 24, 37, 1), rgba(16, 24, 37, 0.1));
  opacity: 1;
  z-index: 0;
  transition-duration: .4s;
}
#testimonial:hover:before {
  opacity: 0.75;
}
#testimonial > a {
  z-index: 1;
}
#testimonial > a > img {
  height: 50px;
}
</style>
