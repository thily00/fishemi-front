<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { axiosInstance } from "@/services/AxiosService";
import type { Employee } from "@/types/employee";
import SettingsCard from "@/components/parametres/SettingsCard.vue";

const toast = useToast();
const selectedEmployees: Ref<string[]> = ref([]);

const props = defineProps({
  employees: {
    type: Array<Employee>,
    required: true,
  },
  getEmployee: {
    type: Function,
    required: true,
  },
});

const removeEmployee = async (employeeIds: string[]) => {
  try {
    const response = await axiosInstance().delete("/settings/manager", {
      params: {
        "manager-id": employeeIds[0],
      },
    });

    toast.add({
      severity: "success",
      summary: "Suppression réussie",
      detail: "L'employé a été supprimé avec succès.",
      life: 3000,
    });

    props.getEmployee();
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
      <li v-for="employee in props.employees" :key="employee.id">
        <SettingsCard
          :name="employee.full_name"
          :email="employee.email"
          :id="employee.id"
          :isOpen="false"
          :selectedEmployees="selectedEmployees"
          @remove="removeEmployee"
        />
      </li>
    </ul>
  </div>
</template>
