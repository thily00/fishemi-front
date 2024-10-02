<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import { useAccountStore } from "@/stores/accountStore";

const accountStore = useAccountStore();
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
  <div
    class="w-full bg-background rounded-md p-4 md:p-5 transition-all duration-300"
  >
    <div class="flex flex-col md:flex-row items-center justify-between">
      <div class="flex items-center gap-4 md:gap-6">
        <i class="pi pi-user fishemi-text-color text-2xl md:text-3xl"></i>
        <div>
          <h1 class="fishemi-text-color text-lg md:text-xl">
            {{ props.name }}
          </h1>
          <h6 class="text-gray-400 text-sm md:text-base">{{ props.email }}</h6>
        </div>
      </div>
      <div
        class="flex gap-2 md:gap-4 items-center mt-4 md:mt-0 w-full sm:w-auto"
      >
        <FishemiButton
          v-if="accountStore.isAdmin"
          label="Supprimer"
          icon="pi pi-trash"
          parentCustomClass="w-full sm:w-auto"
          buttonCustomClass="w-full sm:w-auto"
          @click="removeUsers"
        />
      </div>
    </div>
  </div>
</template>
