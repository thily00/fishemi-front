<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import FishemiButton from "@/components/layouts/FishemiButton.vue";

const props = defineProps({
  id: String,
  name: String,
  email: String,
  isOpen: Boolean,
  selectedUsers: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["remove"]);

const removeUsers = () => {
  const usersIds = [props.id];
  emit("remove", usersIds);
};
</script>

<template>
  <div class="w-full bg-background rounded-md p-5 transition-all duration-300">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center gap-6">
        <i class="pi pi-user fishemi-text-color" style="font-size: 1.75rem"></i>
        <div>
          <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
          <h6 class="text-gray-400">{{ props.email }}</h6>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <FishemiButton
          label="Supprimer"
          icon="pi pi-trash"
          type="primary"
          @click="removeUsers"
        />
      </div>
    </div>
  </div>
</template>
