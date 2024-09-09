<script setup lang="ts">
import { onMounted } from "vue";
// import { useToast } from "primevue/usetoast";
import type { List } from "@/types/list";
import { useListStore } from "@/stores/listStore";
import { useEmployeeStore } from "@/stores/employeeStore";
import ListCard from "@/components/lists/ListCard.vue";
// import type { Employee } from "@/types/employee";

// const toast = useToast();
const listStore = useListStore();
const employeeStore = useEmployeeStore();
const props = defineProps({
  lists: {
    type: Array<List>,
    required: true,
  },
  getLists: {
    type: Function,
    required: true,
  },
});

onMounted(() => {
  const employees = employeeStore.employeeList;
  if (employees.length === 0) {
    employeeStore.getAllEmployees();
  }
});

const toggleCard = (listId: string) => {
  if (listStore.selectedList?.id === listId) {
    listStore.selectedList = null;
  } else {
    listStore.setSelectedList(listId);
  }
};

// const editEmployee = async () => {
//      try{
//         const response: any = await employeeStore.updateEmployee();
//         if(response.status === 200) {
//             props.getEmployee();
//             toast.add({ severity: 'success', summary: 'Modification réussie', detail: 'Les données ont été modifiées avec succès.', life: 3000 });
//         }
//     } catch (error) {
//         console.log(error);
//         toast.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la modification.', life: 3000 });
//     }
// };

// const removeEmployee = async (employeeIds: []) => {
//     try {
//         const response: any = await employeeStore.deleteEmployee(employeeIds);
//         if(response.status === 200) {
//             props.getEmployee();
//             toast.add({ severity: 'success', summary: 'Suppression réussie', detail: 'Les données ont été supprimées avec succès.', life: 3000 });
//         }
//     } catch (error) {
//         console.log(error);
//         toast.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la suppression.', life: 3000 });
//     }
// };
</script>
<template>
  <div class="w-full">
    <ul class="flex flex-col gap-4">
      <li v-for="list in props.lists" :key="list.id">
        <ListCard
          :id="list.id"
          :name="list.name"
          :employee_count="list.employee_count"
          :employeeList="employeeStore.employeeList"
          :isOpen="listStore.selectedList?.id === list.id"
          @toggle="toggleCard(list.id)"
        />
      </li>
    </ul>
  </div>
</template>
<!-- @edit="editEmployee"
@remove="removeEmployee" -->
