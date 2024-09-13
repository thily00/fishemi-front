<script setup lang="ts">
import { defineEmits } from "vue";
import Checkbox from "primevue/checkbox";

const emit = defineEmits(["select-template"]);
const props = defineProps({
  campaignTemplate: {
    type: String,
    required: true,
  },
});

const campaignTemplates = [
  {
    id: "1",
    name: "Office 365",
    image: "/icons/office.svg",
    value: "MICROSOFT",
  },
  {
    id: "2",
    name: "Google Workspace",
    image: "/icons/GWorkspace.svg",
    value: "GOOGLE",
  },
  {
    id: "3",
    name: "Aucun",
    image: null,
    value: "PLAIN",
  },
];

const handleCheckboxChange = (checked: boolean, value: string) => {
  if (checked) {
    emit("select-template", value);
  } else {
    emit("select-template", "");
  }
};
</script>

<template>
  <div class="flex gap-4">
    <div
      v-for="template in campaignTemplates"
      :key="template.id"
      class="w-full flex items-center justify-between bg-background p-6 rounded-md"
    >
      <div class="flex items-center gap-4 rounded-md">
        <Checkbox
          :modelValue="props.campaignTemplate === template.value"
          @update:modelValue="handleCheckboxChange($event, template.value)"
          :binary="true"
          class="bg-blue rounded-sm"
        />
        <img
          v-if="template.image"
          :src="template.image"
          alt="template.name"
          class="w-8 h-8"
        />
        <h1 class="text-lg mb-1 text-gray-500">
          {{ template.name }}
        </h1>
      </div>
    </div>
  </div>
</template>
