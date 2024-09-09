<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { Employee } from "@/types/employee";
import axios from "axios";
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

const apiClient = axios.create({
  baseURL: "https://preprod.api.fishemi.ilies.ch",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

const removeEmployee = async (employeeIds: string[]) => {
  try {
    await apiClient.delete("/settings/manager", {
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
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Une erreur est survenue lors de la suppression.",
      life: 3000,
    });
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
