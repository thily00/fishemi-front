<template>
  <div class="loginView">
    <!-- <div class="bg-frame"></div> -->
    <FishemiContainer>
      <div
        class="auth-screen flex w-full h-screen justify-between items-center gap-4"
      >
        <div class="flex gap-14">
          <div
            class="flex-auto xl:w-[38%] lg:w-[50%] rounded-xl p-10 flex flex-col gap-6 items-center bg-blue card"
          >
            <div class="flex gap-2 items-center mb-8">
              <img src="/logo-alt.png" class="w-10 h-10" alt="logo" />
              <span class="text-white text-2xl">Fishemi</span>
            </div>

            <div class="flex flex-col gap-4 text-white">
              <div class="flex items-center gap-2">
                <img src="/icons/check.svg" alt="check_icon" class="w-6 h-6" />
                <p class="text-xl">
                  Accéder à une interface de gestion intuitive
                </p>
              </div>

              <div class="flex items-center gap-2">
                <img src="/icons/check.svg" alt="check_icon" class="w-6 h-6" />
                <p class="text-xl">
                  Commencez à intégrer vos employés gratuitetement par imporrt
                  de fichier .CSV
                </p>
              </div>

              <div class="flex items-center gap-2">
                <img src="/icons/check.svg" alt="check_icon" class="w-6 h-6" />
                <p class="text-xl">
                  Profitez d'un support 100% francçais présent 7j/7 de 9h à 20h
                  (heure Paris)
                </p>
              </div>
            </div>
          </div>

          <div
            class="flex-auto xl:w-3/6 h-auto rounded-xl p-10 flex flex-col justify-between bg-blue card"
          >
            <p class="fishemi-text-color text-[40px]">
              Connectez-vous à votre compte
            </p>

            <div class="flex flex-col gap-2 text-white">
              <label for="email">E-mail</label>
              <InputText
                id="email"
                v-model="value"
                class="mb-2 bg-background border-slate-700"
              />
              <FishemiButton label="Connexion" fullWidth="true" />
            </div>
          </div>
        </div>
      </div>
    </FishemiContainer>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import FishemiContainer from "@/components/layouts/FishemiContainer.vue";
</script>

<style scoped>
.card {
  position: relative;
  z-index: 2;
}

.bg-frame {
  position: absolute;
  top: 47%;
  left: 51%;
  transform: translate(-50%, -50%);
  background: url("/bg-frame/bg.svg");
  width: 1350px;
  height: 100%;
  z-index: 1;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

@media screen and (max-width: 1350px) {
  .bg-frame {
    width: 1200px;
  }
}
</style>
