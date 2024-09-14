<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { axiosInstance } from "@/services/AxiosService";
import type { Gestionnaire } from "@/types/gestionnaire";
import SettingsCard from "@/components/parametres/SettingsCard.vue";

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
  try {
    const response = await axiosInstance().delete("/settings/manager", {
      params: {
        "manager-id": gestionnairesIds[0],
      },
    });

    toast.add({
      severity: "success",
      summary: "Suppression réussie",
      detail: "Le gestionnaire a été supprimé avec succès.",
      life: 3000,
    });

    props.refreshList();
  } catch (error: any) {
    console.error("Erreur lors de la suppression:", error);

    if (error?.response?.status === 401) {
      toast.add({
        severity: "error",
        summary: "Session expirée",
        detail: "Votre session a expiré. Veuillez vous reconnecter.",
        life: 3000,
      });
      window.location.href = "/login";
    } else {
      toast.add({
        severity: "error",
        summary: "Erreur",
        detail: "Une erreur est survenue lors de la suppression.",
        life: 3000,
      });
    }
  }
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
