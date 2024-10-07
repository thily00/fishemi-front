<script setup lang="ts">
import { useRouter } from "vue-router";
import { type Campaign } from "@/types/campaign";
import CampaignCard from "@/components/campagnes/CampaignCard.vue";
import { useCampaignStore } from "@/stores/campaignStore";


const router = useRouter();
const campaignStore = useCampaignStore();
const props = defineProps<{
  campaigns: Campaign[];
  refreshList: () => void;
  toast: any;
}>();

const handleEditCampaign = (campaignId: string) => {
  router.push({ name: "edit-campaign", params: { id: campaignId } });
};

const handleRemoveCampaign = async (campaignId: string) => {
    await campaignStore.deleteCampaign(campaignId);
    props.toast.add({
      severity: "success",
      summary: "Suppression réussie",
      detail: "La campagne a été supprimée avec succès.",
      life: 3000,
    });
    props.refreshList();
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
          @edit="handleEditCampaign"
          @remove="handleRemoveCampaign"
          @accessResults="handleAccessResults"
        />
      </li>
    </ul>
  </div>
</template>
