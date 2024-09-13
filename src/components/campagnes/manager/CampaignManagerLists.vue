<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Checkbox from "primevue/checkbox";
import type { List } from "@/types/list";

const emit = defineEmits(["remove-list"]);
const props = defineProps({
  campaignLists: {
    type: Array as () => List[],
    required: true,
  },
});

const handleCheckboxChange = (checked: boolean, id: string) => {
  emit("remove-list", { checked, id });
};
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-4" v-if="props.campaignLists.length > 0">
      <div
        v-for="list in props.campaignLists"
        :key="list.id"
        class="w-full flex items-center justify-between bg-background p-4 rounded-md"
      >
        <div class="flex items-center gap-6 rounded-md">
          <Checkbox
            :modelValue="props.campaignLists.includes(list)"
            @update:modelValue="handleCheckboxChange($event, list.id)"
            :binary="true"
            class="bg-blue rounded-sm"
          />
          <i
            class="pi pi-users fishemi-text-color"
            style="font-size: 1.75rem"
          ></i>
          <div>
            <h1 class="fishemi-text-color text-xl mb-1">
              {{ list.name }}
            </h1>
            <h6
              class="text-gray-400"
              v-if="list.employee_count && list.employee_count <= 1"
            >
              {{ list.employee_count }} membre
            </h6>
            <h6 class="text-gray-400" v-else>
              {{ list.employee_count }} membres
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4">
      <p class="text-gray-500 italic">Veuillez selectionner une liste...</p>
    </div>
  </div>
</template>
