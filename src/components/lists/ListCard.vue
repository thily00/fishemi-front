<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import IconField from "primevue/iconfield";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useListStore } from "@/stores/listStore";
import type { Employee } from "@/types/employee";
import FishemiButton from "@/components/layouts/FishemiButton.vue";

const emit = defineEmits(["toggle", "edit", "remove"]);
const listStore = useListStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: String,
  isOpen: Boolean,
  employee_count: Number,
  employeeList: {
    type: Array<Employee>,
    required: true,
  },
  listEmployees: {
    type: Array<String>,
    required: true,
  },
});

const listEmployees = ref<String[]>(props.listEmployees);
const employeeSearchQuery = ref("");

const toggleCard = () => {
  emit("toggle");
};

const editList = () => {
  const list = {
    id: listStore.selectedList?.id,
    name: listStore.selectedList?.name,
    employee_ids: listEmployees.value,
  };
  emit("edit", list);
};

const removeList = () => {
  const listIds = [props.id];
  emit("remove", listIds);
};

const handleCheckboxChange = (checked: boolean) => {
  const updatedList = [...listStore.selectedLists];
  if (checked) {
    updatedList.push(props.id);
  } else {
    const index = updatedList.indexOf(props.id);
    updatedList.splice(index, 1);
  }

  listStore.setSelectionList(updatedList);
};

const handleEmployeeCheckboxChange = async (employeeId: string) => {
  if (listEmployees.value.includes(employeeId)) {
    await listStore.removeEmployee(props.id, employeeId);
    const index = listEmployees.value.indexOf(employeeId);
    listEmployees.value.splice(index, 1);
  } else {
    await listStore.addEmployeeToList(props.id, employeeId);
    listEmployees.value.push(employeeId);
  }
};

const filteredEmployeeList = computed(() => {
  return props.employeeList.filter((employee) =>
    employee.full_name.toLowerCase().includes(employeeSearchQuery.value)
  );
});

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
    <transition
      name="expand-fade"
      mode="out-in"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
    >
      <div
        v-if="!isOpen"
        class="w-full flex items-center justify-between flex-col gap-4 md:flex-row"
      >
        <div class="flex items-center gap-6 rounded-md">
          <Checkbox
            :modelValue="listStore.selectedLists.includes(props.id)"
            @update:modelValue="handleCheckboxChange"
            :binary="true"
            class="bg-blue rounded-sm"
          />
          <i
            class="pi pi-users fishemi-text-color"
            style="font-size: 1.75rem"
          ></i>
          <div>
            <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
            <h6
              class="text-gray-400"
              v-if="props.employee_count && props.employee_count <= 1"
            >
              {{ props.employee_count }} membre
            </h6>
            <h6 class="text-gray-400" v-else>
              {{ props.employee_count }} membres
            </h6>
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
            :action="removeList"
          />
        </div>
      </div>
    </transition>

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
          <i class="pi pi-users fishemi-text-color text-2xl cursor-pointer"></i>
          <div>
            <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
            <h6
              class="text-gray-400"
              v-if="props.employee_count && props.employee_count <= 1"
            >
              {{ props.employee_count }} membre
            </h6>
            <h6 class="text-gray-400" v-else>
              {{ props.employee_count }} membres
            </h6>
          </div>
        </div>
        <div
          class="form flex flex-col flex-start my-4"
          v-if="listStore.selectedList"
        >
          <div class="flex flex-col my-6 gap-4">
            <div class="w-full flex flex-col gap-4 text-white">
              <label for="name">Nom de la liste</label>
              <InputText
                id="name"
                class="mb-2 bg-background border-slate-700"
                v-model="listStore.selectedList.name"
              />
            </div>
            <div class="w-full flex flex-col gap-4 text-white">
              <label for="name">Employés</label>
              <div class="w-96">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText
                    placeholder="Rechercher un employé..."
                    class="border-0 bg-blue p-4"
                    v-model="employeeSearchQuery"
                  />
                </IconField>
              </div>
              <ul class="flex gap-4">
                <li
                  v-for="employee in filteredEmployeeList"
                  :key="employee.id"
                  class="flex flex-col items-start gap-1 bg-blue rounded-md p-4"
                >
                  <Checkbox
                    :modelValue="listEmployees.includes(employee.id)"
                    @update:modelValue="
                      handleEmployeeCheckboxChange(employee.id)
                    "
                    :binary="true"
                    class="bg-background rounded-md"
                  />
                  <h1 class="fishemi-text-color text-lg mb-0">
                    {{ employee.full_name }}
                  </h1>
                  <h6 class="text-gray-400 text-md">{{ employee.email }}</h6>
                </li>
              </ul>
            </div>
          </div>
          <FishemiButton label="Enregistrer" :action="editList" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
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
