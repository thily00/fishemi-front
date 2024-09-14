<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import type { Employee } from "@/types/employee";
import { useEmployeeStore } from "@/stores/employeeStore";
import EmployeeCard from "@/components/employees/EmployeeCard.vue";

const toast = useToast();
const emit = defineEmits(["get-employees"]);
const employeeStore = useEmployeeStore();
const props = defineProps({
  employees: {
    type: Array<Employee>,
    required: true,
  },
});

const toggleCard = (employeeId: string) => {
  if (employeeStore.selectedEmployee?.id === employeeId) {
    employeeStore.selectedEmployee = null;
  } else {
    employeeStore.setSelectedEmployee(employeeId);
  }
};

const editEmployee = async () => {
  try {
    const response: any = await employeeStore.updateEmployee();
    if (response.status === 200) {
      emit("get-employees");
      toast.add({
        severity: "success",
        summary: "Modification réussie",
        detail: "Les données ont été modifiées avec succès.",
        life: 3000,
      });
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Une erreur est survenue lors de la modification.",
      life: 3000,
    });
  }
};

const removeEmployee = async (employeeIds: []) => {
  try {
    const response: any = await employeeStore.deleteEmployee(employeeIds);
    if (response.status === 200) {
      emit("get-employees");
      toast.add({
        severity: "success",
        summary: "Suppression réussie",
        detail: "Les données ont été supprimées avec succès.",
        life: 3000,
      });
    }
  } catch (error) {
    console.log(error);
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
        <EmployeeCard
          :name="employee.full_name"
          :email="employee.email"
          :id="employee.id"
          :isOpen="employeeStore.selectedEmployee?.id === employee.id"
          @edit="editEmployee"
          @remove="removeEmployee"
          @toggle="toggleCard(employee.id)"
        />
      </li>
    </ul>
  </div>
</template>
