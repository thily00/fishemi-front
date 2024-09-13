<script setup lang="ts">
import { useRouter } from "vue-router";
import { type Campaign } from "@/types/campaign";
import CampaignCard from "@/components/campagnes/CampaignCard.vue";
import { axiosInstance } from "@/services/AxiosService";

const router = useRouter();
const props = defineProps<{
  campaigns: Campaign[];
  refreshList: () => void;
  toast: any;
}>();

const handleEditCampaign = (campaignId: string) => {
  console.log("Edition de la campagne:", campaignId);
};

const handleRemoveCampaign = async (campaignId: string) => {
  try {
    await axiosInstance().delete("/campaign/delete", {
      params: { id: campaignId },
    });
    props.toast.add({
      severity: "success",
      summary: "Suppression réussie",
      detail: "La campagne a été supprimée avec succès.",
      life: 3000,
    });
    props.refreshList();
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    props.toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Une erreur est survenue lors de la suppression.",
      life: 3000,
    });
  }
};

const handleAccessResults = (campaignId: string) => {
  router.push({ name: "CampaignResults", params: { id: campaignId } });
};
</script>

<template>
  <div class="w-full">
    <ul class="flex flex-col gap-4">
      <li v-for="campaign in props.campaigns" :key="campaign.id">
        <CampaignCard
          :id="campaign.id"
          :name="campaign.name"
          :status="campaign.status"
          @remove="handleRemoveCampaign"
          @accessResults="handleAccessResults"
        />
      </li>
    </ul>
  </div>
</template>
