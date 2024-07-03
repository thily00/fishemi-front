<script setup lang="ts">
import FishemiHeader from "../layouts/headers/FishemiHeader.vue";
import FishemiButton from "../layouts/FishemiButton.vue";
import Card from "../home/HomeCards.vue";
</script>

<template>
  <div class="w-full">
    <FishemiHeader />
    <div class="grid grid-cols-6 gap-4 pt-8">
      <div class="col-start-2 col-span-4">
        <div class="text-hero text-center">
          <h1
            class="text-[8vw] sm:text-[6vw] md:text-5vw] lg:text-[4vw] font-['Aeonik'] font-black pb-4"
          >
            Simuler des attaques phising pour sensibiliser vos employés
          </h1>
          <h2
            class="text-[5vw] sm:text-[4vw] md:text-3vw] lg:text-[2vw] font-['Aeonik'] pb-4"
          >
            Découvrez Fishemi et simulez des attaques phishing personnalisées.
            Sécurisez votre entreprise avec nos solutions intelligentes et
            restez toujours un pas en avant des menaces
          </h2>
          <FishemiButton label="Inscrire mon organisation" />
        </div>
      </div>
    </div>

    <div class="container mx-auto p-4">
      <!-- Première ligne -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          class="col-span-2 md:col-span-2"
          percentage="test bjr"
          title="Des attaques de cybersécurité réussies sont des attaques de type phishing"
        />

        <Card
          class="col-span-1 md:col-span-1"
          percentage="3,99 €"
          title="C'est le prix HT par employés que coûte une simulation d'attaque Fishemi"
        />
      </div>

      <!-- Deuxième ligne -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card
          class="col-span-1 md:col-span-1"
          title="Une tarification comme bon vous semble"
          content="Profitez d'une tarification 'pay-as-go' et payez uniquement à chaque campagne lancée. Ainsi, si vous voulez lancer une simulation d'attaque avec 20 employés, vous ne payerez que 59,80 € (HT)"
        />

        <Card
          class="col-span-1 md:col-span-1"
          title="Nous prenons en charge les suites professionnelles Office 365 et Google Workspace afin de pouvoir fournir des templates d’e-mail de phishing ultra-réaliste en utilisant l’intelligence artificielle."
          logo="path/to/logo.png"
        />
      </div>

      <!-- Troisième ligne -->
      <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
        <div class="bg-gray-800 p-6 rounded col-span-1 md:col-span-1">
          <p class="text-4xl font-bold text-yellow-400">$43 000 000 000</p>
          <p class="mt-2">
            Les pertes liées aux phishing en 2022 sont estimé à plus de 43
            milliards de dollars
          </p>
        </div>
      </div>

      <!-- Quatrième ligne -->
      <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
        <div
          class="bg-yellow-400 text-gray-900 p-6 rounded col-span-1 md:col-span-1"
        >
          <p class="text-2xl font-bold">L'inscription est 100% gratuite</p>
          <button class="mt-2 px-4 py-2 bg-gray-900 text-yellow-400 rounded">
            M'inscrire
          </button>
        </div>
      </div>

      <!-- Cinquième ligne -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div class="bg-gray-800 p-6 rounded col-span-2 md:col-span-2">
          <p>27 bis rue du Progrès - 93100 Montreuil</p>
          <p>Fishemi © - 2024</p>
        </div>
        <div class="bg-gray-800 p-6 rounded col-span-1 md:col-span-1">
          <p>27 bis rue du Progrès - 93100 Montreuil</p>
          <p>Fishemi © - 2024</p>
        </div>
      </div>
    </div>
  </div>
</template>
