<script setup lang="ts">
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import { useAccountStore } from "@/stores/accountStore";
import { useRouter } from "vue-router";

const router = useRouter();
const accountStore = useAccountStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["edit", "remove", "accessResults"]);

const editCampaign = () => {
  emit("edit", props.id);
};

const removeCampaign = () => {
  emit("remove", props.id);
};

const accessResults = () => {
  router.push({ name: "campaignResults", params: { id: props.id } });
};
</script>

<template>
  <div
    class="w-full bg-background rounded-md p-5 flex flex-col sm:flex-row gap-4 justify-between items-center"
  >
    <div class="flex items-center gap-4">
      <i
        class="pi pi-envelope fishemi-text-color"
        style="font-size: 1.75rem"
      ></i>
      <div>
        <h1 class="fishemi-text-color text-xl">{{ name }}</h1>
        <h6 class="text-gray-400">Statut: {{ status }}</h6>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
      <FishemiButton
        v-if="status === 'draft' && (accountStore.isAdmin || accountStore.isEditor)"
        label="Modifier"
        icon="pi pi-pencil"
        type="secondary"
        parentCustomClass="w-full sm:w-auto"
        buttonCustomClass="w-full sm:w-auto"
        :action="editCampaign"
      />
      <FishemiButton
        v-if="status === 'draft' && (accountStore.isAdmin || accountStore.isEditor)"
        label="Supprimer"
        icon="pi pi-trash"
        type="primary"
        parentCustomClass="w-full sm:w-auto"
        buttonCustomClass="w-full sm:w-auto"
        :action="removeCampaign"
      />
      <FishemiButton
        v-if="status === 'sent'"
        label="Accéder aux résultats"
        icon="pi pi-play"
        type="secondary"
        parentCustomClass="w-full sm:w-auto"
        buttonCustomClass="w-full sm:w-auto"
        :action="accessResults"
      />
    </div>
  </div>
</template>
