<script setup lang="ts">
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useEmployeeStore } from "@/stores/employeeStore";
import FishemiButton from "@/components/layouts/FishemiButton.vue";

const employeeStore = useEmployeeStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: String,
  email: String,
  isOpen: Boolean,
});

const emit = defineEmits(["toggle", "edit", "remove"]);

const toggleCard = () => {
  emit("toggle");
};

const editEmployee = () => {
  emit("edit");
};

const removeEmployee = () => {
  const employeeIds = [props.id];
  emit("remove", employeeIds);
};

const handleCheckboxChange = (checked: boolean) => {
  const updatedList = [...employeeStore.selectedEmployees];
  if (checked) {
    updatedList.push(props.id);
  } else {
    const index = updatedList.indexOf(props.id);
    updatedList.splice(index, 1);
  }

  employeeStore.setSelectionList(updatedList);
};

const beforeEnter = (el: HTMLElement | any) => {
  el.style.maxHeight = "0";
  el.style.opacity = "0";
};

const enter = (el: HTMLElement | any) => {
  el.style.maxHeight = el.scrollHeight + "px";
  el.style.opacity = "1";
};

const afterEnter = (el: HTMLElement | any) => {
  el.style.maxHeight = "none";
};

const beforeLeave = (el: HTMLElement | any) => {
  el.style.maxHeight = el.scrollHeight + "px";
  el.style.opacity = "1";
};

const leave = (el: HTMLElement | any) => {
  el.style.maxHeight = "0";
  el.style.opacity = "0";
};
</script>

<template>
  <div class="w-full bg-background rounded-md p-5 transition-all duration-300">
    <!-- Transition pour la vue par défaut (affichage employé) -->
    <transition
      name="expand-fade"
      mode="out-in"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
    >
      <div v-if="!isOpen" class="w-full flex items-center justify-between">
        <div class="flex items-center gap-6">
          <Checkbox
            :modelValue="employeeStore.selectedEmployees.includes(props.id)"
            @update:modelValue="handleCheckboxChange"
            :binary="true"
            class="bg-blue rounded-sm"
          />
          <i
            class="pi pi-user fishemi-text-color"
            style="font-size: 1.75rem"
          ></i>
          <div>
            <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
            <h6 class="text-gray-400">{{ props.email }}</h6>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <FishemiButton
            label="Modifier"
            icon="pi pi-pencil"
            type="secondary"
            :action="toggleCard"
          />

          <FishemiButton
            label="Supprimer"
            icon="pi pi-trash"
            type="primary"
            :action="removeEmployee"
          />
        </div>
      </div>
    </transition>

    <!-- Transition pour la vue de modification -->
    <transition
      name="expand-fade"
      mode="out-in"
      @enter="enter"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-if="isOpen"
        class="w-full flex flex-col"
        style="overflow: hidden; transition: max-height 0.3s ease"
      >
        <div class="flex items-center gap-6">
          <i
            class="pi pi-times text-gray-400 text-2xl cursor-pointer"
            @click="toggleCard"
          ></i>
          <div class="w-0.5 min-h-6 bg-gray-400"></div>
          <i class="pi pi-user fishemi-text-color text-2xl cursor-pointer"></i>
          <div>
            <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
            <h6 class="text-gray-400">{{ props.email }}</h6>
          </div>
        </div>
        <div
          class="form flex flex-col flex-start my-4"
          v-if="employeeStore.selectedEmployee"
        >
          <div class="flex my-8 gap-4">
            <div class="w-full flex flex-col gap-2 text-white">
              <label for="name">Nom</label>
              <InputText
                id="name"
                class="mb-2 bg-background border-slate-700"
                v-model="employeeStore.selectedEmployee.full_name"
              />
            </div>
            <div class="w-full flex flex-col gap-2 text-white">
              <label for="email">E-mail</label>
              <InputText
                id="email"
                class="mb-2 bg-background border-slate-700"
                v-model="employeeStore.selectedEmployee.email"
              />
            </div>
          </div>
          <FishemiButton label="Enregistrer" :action="editEmployee" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Animation pour la transition d'apparition et disparition */
.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
.expand-fade-enter,
.expand-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
