<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { Campaign } from "@/types/campaign";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import CampaignsList from "@/components/campagnes/CampaignsList.vue";
import { axiosInstance } from "@/services/AxiosService";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/accountStore";

const toast = useToast();
const router = useRouter();
const accountStore = useAccountStore();
const campaigns: Ref<Campaign[]> = ref([]);

const fetchCampaigns = async () => {
  try {
    const response = await axiosInstance().get("/campaign");
    const data = response.data;
    campaigns.value = data.map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des campagnes:", error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Impossible de récupérer les campagnes.",
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchCampaigns();
});
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
