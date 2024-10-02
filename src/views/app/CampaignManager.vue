<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useListStore } from "@/stores/listStore";
import InputText from "primevue/inputtext";
import type { List } from "@/types/list";
import Textarea from "primevue/textarea";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import { useCampaignStore } from "@/stores/campaignStore";
import { useRoute } from "vue-router";

import StripeCheckout from "@/components/stripe/StripeCheckout.vue";
import FishemiAutoComplete from "@/components/layouts/FishemiAutoComplete.vue";
import CampaignManagerLists from "@/components/campagnes/manager/CampaignManagerLists.vue";
import CampaignManagerTemplate from "@/components/campagnes/manager/CampaignManagerTemplate.vue";

const toast = useToast();
const route = useRoute();
const listStore = useListStore();
const campaignStore = useCampaignStore();
const companyLists: Ref<List[]> = ref([]);
const defaultContent = `Cher {{employeeName}},\n\n Votre mot de passe vient d'expirer, noud vous invitons à cliquer sur le bouton ci-dessous afin de pouvoir changer votre mot de passe.\n\n{{boutton}}\n\n Attention, sans action de votre part, nous suspendrons votre compte.\n\n Cordialement,\n La direction des systèmes d'information.`;
const campaignLists: Ref<List[]> = ref([]);
const campaignTemplate: Ref<string> = ref("");
const campaignName: Ref<string> = ref("");
const campaignSubject: Ref<string> = ref("");
const campaignContent: Ref<string> = ref(defaultContent);
const CostEstimation: Ref<number> = ref(0);
const generatingContent: Ref<boolean> = ref(false);
const checkoutSession: Ref<string> = ref("");
const paymentInProgress: Ref<boolean> = ref(false);

onMounted(() => {
  getLists();

  // Hydrate data if we are in edit mode
  const route = useRoute();
  if (route.name === "edit-campaign") {
    hydrateData();
  }
});

const hydrateData = async () => {
  try {
    const campaignId = route.params.id as string;
    const response: any = await campaignStore.getCampaign(campaignId);

    if (response && response.status === 200) {
      campaignName.value = response.data.name;
      campaignSubject.value = response.data.subject;
      campaignContent.value = response.data.content;
      campaignTemplate.value = response.data.template;
      campaignLists.value = response.data.lists as List[];
      estimateCost();
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de la campagne:",
      error
    );
  }
};

const getLists = async () => {
  companyLists.value = listStore.lists;

  if (companyLists.value.length === 0) {
    await listStore.getAllLists();
    companyLists.value = listStore.lists;
  }
};

const addList = (listId: string) => {
  const list = companyLists.value.find((list) => list.id === listId);
  if (list) {
    campaignLists.value.push(list);
    estimateCost();
  }
};

const removeList = (data: { checked: boolean; id: "string" }) => {
  if (data && !data.checked) {
    const index = campaignLists.value.findIndex((list) => list.id === data.id);
    campaignLists.value.splice(index, 1);
    if (campaignLists.value.length === 0) {
      CostEstimation.value = 0;
    } else {
      estimateCost();
    }
  }
};

const selectTemplate = (template: string) => {
  campaignTemplate.value = template;
};

const generateContent = async () => {
  generatingContent.value = true;
  const response: any = await campaignStore.generateContent();
  generatingContent.value = false;
  if (response && response.status === 200) {
    campaignContent.value = response.data.content;
  }
};

const estimateCost = async () => {
  const lists = campaignLists.value.map((list) => list.id);
  const response: any = await campaignStore.calculatePrice(lists);
  if (response && response.status === 201) {
    CostEstimation.value = response.data.eurosExcludingTaxTotal;
  }
};

const createCampaign = async () => {
  paymentInProgress.value = true;
  const campaign = {
    lists: campaignLists.value.map((list) => list.id),
    name: campaignName.value,
    template: campaignTemplate.value,
    subject: campaignSubject.value,
    content: campaignContent.value,
  };
  const response: any = await campaignStore.createCampaign(campaign);
  paymentInProgress.value = false;
  if (response && response.status === 201) {
    const res: any = await campaignStore.createCheckout(response.data.id);
    if (res && res.status === 200) {
      checkoutSession.value = res.data.checkout_id;
    }
  }
};

const editCampaign = async () => {
  const campaign = {
    id: route.params.id as string,
    lists: campaignLists.value.map((list) => list.id),
    name: campaignName.value,
    template: campaignTemplate.value,
    subject: campaignSubject.value,
    content: campaignContent.value,
  };

  const response: any = await campaignStore.updateCampaign(campaign);
  if (response && response.status === 200) {
    toast.add({
      severity: "success",
      summary: "Campagne modifiée",
      detail: "La campagne a été modifiée avec succès",
      life: 2000,
    });
  }
};
</script>

<template>
  <div class="w-full h-full rounded-lg bg-blue p-4 md:p-10">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-3xl text-white">Nouvelle Campagne</h3>
    </div>
    <div class="flex flex-col my-12 gap-4">
      <div class="w-full flex flex-col gap-4 text-white">
        <h3 class="text-3xl text-white">Liste</h3>
        <FishemiAutoComplete
          placeholder="Rechercher une liste..."
          :id="'id'"
          :searchBy="'name'"
          :dataSource="companyLists"
          @onItemSelected="addList"
        />
        <CampaignManagerLists
          :campaignLists="campaignLists"
          @remove-list="removeList"
        />
      </div>
    </div>

    <div class="flex flex-col my-12 gap-4">
      <div class="w-full flex flex-col gap-4 text-white">
        <h3 class="text-3xl text-white">Template de la campagne</h3>
        <CampaignManagerTemplate
          :campaignTemplate="campaignTemplate"
          @select-template="selectTemplate"
        />
      </div>
    </div>

    <div class="flex flex-col my-12 gap-4">
      <div class="w-full flex flex-col gap-4 text-white">
        <h3 class="text-3xl text-white">Personnalisation</h3>
        <div class="form flex flex-col mb-0 gap-0">
          <div class="w-full flex flex-col gap-2 text-white">
            <label for="name">Nom de la campagne</label>
            <InputText
              id="name"
              v-model="campaignName"
              class="mb-2 bg-background border-slate-700"
            />
          </div>
          <div class="w-full flex flex-col gap-2 text-white">
            <label for="subject">Sujet du mail</label>
            <InputText
              id="subject"
              v-model="campaignSubject"
              class="mb-2 bg-background border-slate-700"
            />
          </div>
          <div class="w-full flex flex-col gap-2 text-white">
            <label for="content">Contenu du mail</label>
            <Textarea
              id="content"
              v-model="campaignContent"
              rows="10"
              cols="30"
              class="p-3 mb-2 bg-background border border-slate-700"
            />
          </div>
        </div>

        <div
          class="flex items-center gap-2 bg-[#8432AA] w-fit p-4 rounded-full cursor-pointer"
          @click="generateContent"
        >
          <img src="/icons/aiWhite.svg" alt="bot-img" />
          <span>Générer le contenu du mail avec l'IA</span>
          <i
            v-if="generatingContent"
            class="pi pi-spin pi-spinner"
            style="font-size: 1rem"
          ></i>
        </div>
        <div>
          <p class="text-gray-500 mb-1">
            Ce texte sera envoyé dans le mail à destination de vos employés.
            Vous pouvez utiliser les variables dynamiques suivantes :
          </p>
          <ul class="flex flex-col list-disc ml-6 gap-1">
            <li v-pre class="text-gray-500">
              {{ employeeName }}: Nom de l'employee
            </li>
            <li v-pre class="text-gray-500">
              {{ boutton }}: Boutton qui redirige sur le formulaire de connexion
            </li>
            <li v-pre class="text-gray-500">
              {{ employeEmail }}:Adresse mail de l'employé
            </li>
          </ul>
        </div>

        <StripeCheckout :sessionId="checkoutSession" />

        <div class="flex flex-col items-center">
          <FishemiButton
            label="Sauvegarder la campagne"
            icon="pi pi-download"
            type="secondary"
            :fullWidth="true"
            :action="editCampaign"
          />

          <FishemiButton
            :label="'Lancer la campagne'"
            :fullWidth="true"
            :action="createCampaign"
            :loading="paymentInProgress"
            icon="pi pi-play"
          />

          <p class="mt-3 text-gray-400">
            Cout de la campagne: {{ CostEstimation }} €
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
