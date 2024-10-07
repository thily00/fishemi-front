<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { Gestionnaire } from "@/types/gestionnaire";
import SettingsCard from "@/components/parametres/SettingsCard.vue";
import SettingsServices from "@/services/SettingsServices";

const toast = useToast();
const selectedGestionnaires: Ref<string[]> = ref([]);

const props = defineProps({
  gestionnaires: {
    type: Array<Gestionnaire>,
    required: true,
  },
  refreshList: {
    type: Function,
    required: true,
  },
});

const removeGestionnaire = async (gestionnairesIds: string[]) => {
    await SettingsServices.deleteGestionnaire(gestionnairesIds);
    toast.add({
      severity: "success",
      summary: "Suppression réussie",
      detail: "Le gestionnaire a été supprimé avec succès.",
      life: 3000,
    });

    props.refreshList();
};
</script>

<template>
  <div class="w-full">
    <ul class="flex flex-col gap-4">
      <li v-for="gestionnaire in props.gestionnaires" :key="gestionnaire.id">
        <SettingsCard
          :name="gestionnaire.full_name"
          :email="gestionnaire.email"
          :id="gestionnaire.id"
          :isOpen="false"
          :selectedUsers="selectedGestionnaires"
          @remove="removeGestionnaire"
        />
      </li>
    </ul>
  </div>
</template>
