<script setup lang="ts">
import { onMounted } from "vue";
import type { List } from "@/types/list";
import { useListStore } from "@/stores/listStore";
import { useEmployeeStore } from "@/stores/employeeStore";
import ListCard from "@/components/lists/ListCard.vue";
import { useToastService }  from '@/services/ToastService';

const { showToast } = useToastService();
const listStore = useListStore();
const emit = defineEmits(["get-lists"]);
const employeeStore = useEmployeeStore();
const props = defineProps({
  lists: {
    type: Array<List>,
    required: true,
  },
});

onMounted(() => {
  const employees = employeeStore.employeeList;
  if (employees?.length === 0) {
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

const editList = async (list: List) => {
  const response = await listStore.updateList(list);
  if (response?.status === 200) {
    emit("get-lists");
    showToast({
      severity: "success",
      summary: "Modification réussie",
      detail: "Les données ont été modifiées avec succès.",
      life: 3000,
    });
  }
};

const removeList = async (listIds: []) => {
    await listStore.deleteList(listIds);
    emit("get-lists");
    showToast({
      severity: "success",
      summary: "Suppression réussie",
      detail: "Les données ont été supprimées avec succès.",
      life: 3000,
    });
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
          @edit="editList"
          @remove="removeList"
        />
      </li>
    </ul>
  </div>
</template>
