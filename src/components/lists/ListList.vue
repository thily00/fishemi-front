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
          :listEmployees="list.employee_lists.map((el) => el.id)"
          :isOpen="listStore.selectedList?.id === list.id"
          @toggle="toggleCard(list.id)"
        />
      </li>
    </ul>
  </div>
</template>
<!-- @edit="editEmployee"
@remove="removeEmployee" -->
