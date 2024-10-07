<template>
  <div class="w-full h-full rounded-lg bg-blue p-4 md:p-10">
    <div class="mb-8">
      <h3 class="text-3xl mb-4 text-white">Campagne “{{ campaign.name }}”</h3>
      <p class="text-sm text-grey">
        Campagne créée le {{ formatDate(campaign.created_at) }}
      </p>
    </div>

    <div class="my-12">
      <h3 class="text-3xl mb-4 text-white">Listes</h3>
      <CampaignLists :lists="campaign.lists" />
    </div>

    <div class="my-12">
      <h3 class="text-3xl mb-4 text-white">Statistiques</h3>
      <CampaignStats :stats="campaign.stats" />
    </div>

    <div class="my-12">
      <h3 class="text-3xl mb-4 text-white">Événements</h3>
      <CampaignEvents :events="campaign.events" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCampaignStore } from "@/stores/campaignStore";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import CampaignStats from "@/components/campagnesResults/CampaignStats.vue";
import CampaignEvents from "@/components/campagnesResults/CampaignEvents.vue";
import CampaignLists from "@/components/campagnesResults/CampaignLists.vue";

dayjs.locale("fr");

const route = useRoute();
const campaignStore = useCampaignStore();
const campaignId = route.params.id;

const campaign = ref({
  name: "",
  created_at: "",
  lists: [],
  stats: {
    total: 0,
    total_sent: 0,
    total_opened: 0,
  },
  events: [],
});

const fetchCampaignData = async () => {
  const reponse = await campaignStore.getCampaign(campaignId as string);
  campaign.value = reponse;
};

const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("D MMMM YYYY à HH:mm");
};

onMounted(() => {
  fetchCampaignData();
});
</script>
