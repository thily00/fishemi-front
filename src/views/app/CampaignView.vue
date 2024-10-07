<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import CampaignsList from "@/components/campagnes/CampaignsList.vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/accountStore";
import { useCampaignStore } from "@/stores/campaignStore";

const toast = useToast();
const router = useRouter();
const accountStore = useAccountStore();
const campaignStore = useCampaignStore();

const fetchCampaigns = async () => {
  await campaignStore.getAllCampaigns();
};

onMounted(() => {
  fetchCampaigns();
});

const campaigns = computed(() => campaignStore.campaigns);
</script>

<template>
  <div class="w-full h-full rounded-lg bg-blue p-4 sm:p-10">
    <div class="mb-12">
      <div class="flex flex-col sm:flex-row gap-4 justify-between">
        <h3 class="text-3xl text-white">Vos campagnes</h3>
        <FishemiButton
          v-if="accountStore.isAdmin || accountStore.isEditor"
          class="flex sm:justify-center"
          label="Créer une nouvelle campagne"
          icon="pi pi-plus"
          @click="router.push('/campagnes/nouvelle-campagne')"
        />
      </div>
      <p class="mt-4 text-xl text-gray-500">
        Vous pouvez créer autant de campagnes que vous souhaitez, une fois la
        campagne renseignée, vous pouvez la lancer à tout moment. Une fois la
        campagne lancée, vous ne pouvez pas la supprimer.
      </p>
    </div>

    <CampaignsList
      :campaigns="campaigns"
      :refreshList="fetchCampaigns"
      :toast="toast"
    />
  </div>
</template>
