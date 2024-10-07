<script setup lang="ts">
import type { Employee } from "@/types/employee";
import { useEmployeeStore } from "@/stores/employeeStore";
import { useToastService }  from '@/services/ToastService';
import EmployeeCard from "@/components/employees/EmployeeCard.vue";

const { showToast } = useToastService();
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
  const response = await employeeStore.updateEmployee();
  if (response?.status === 200) {
    emit("get-employees");
    showToast({
      severity: "success",
      summary: "Modification réussie",
      detail: "Les données ont été modifiées avec succès.",
      life: 3000,
    });
  }
};

const removeEmployee = async (employeeIds: []) => {
  const response = await employeeStore.deleteEmployee(employeeIds);
  if (response?.status === 200) {
    emit("get-employees");
    showToast({
      severity: "success",
      summary: "Suppression réussie",
      detail: "Les données ont été supprimées avec succès.",
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
