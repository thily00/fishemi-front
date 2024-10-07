<script setup lang="ts">
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { useToastService }  from '@/services/ToastService';
import { ref, type Ref, onMounted, computed } from "vue";
import { useEmployeeStore } from "@/stores/employeeStore";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import EmployeeList from "@/components/employees/EmployeeList.vue";
import { useAccountStore } from "@/stores/accountStore";

const { showToast } = useToastService();
const accountStore = useAccountStore();
const searchValue: Ref<string> = ref("");
const fileUploading: Ref<boolean> = ref(false);
const fileInput: Ref<HTMLInputElement | null> = ref(null);
const employeeStore = useEmployeeStore();


const getEmployee = async () => {
  await employeeStore.getAllEmployees();
};

const importEmployees = async (file: File) => {
  const response = await employeeStore.importEmployees(file);
  if (response?.status === 201) {
    await getEmployee();
    showToast({
      severity: "success",
      summary: "Importation réussie",
      detail: "Les données ont été importées avec succès.",
      life: 3000,
    });
  }
};

const removeSelection = async () => {
  const employeeIds = employeeStore.selectedEmployees;
  const response = await employeeStore.deleteEmployee(employeeIds);
  if (response?.status === 200) {
    await getEmployee();
    employeeStore.setSelectionList([]);
    showToast({
      severity: "success",
      summary: "Suppression réussie",
      detail: "Les employés sélectionnés ont été supprimés avec succès.",
      life: 3000,
    });
  }
};

const removeAll = () => {
  employeeStore.setSelectionList(
  employeeStore.employeeList.map((employee) => employee.id)
  );
  removeSelection();
};

const search = async () => {
  await employeeStore.searchEmployee(searchValue.value);
  if(employeeStore.employeeList.length === 0) {
    getEmployee();
  }
};

const triggerFileInput = (): void => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event: Event): Promise<void> => {
  fileUploading.value = true;
  const target = event.target as HTMLInputElement;
  const file: File | null = target.files ? target.files[0] : null;

  if (file) {
    importEmployees(file);
  }

  fileUploading.value = false;
};

onMounted(() => {
  getEmployee();
});

const employees = computed(() => employeeStore.employeeList);
</script>
<template>
  <div class="w-full h-full rounded-lg bg-blue p-4 md:p-10" v-if="employees">
    <div
      class="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4"
    >
      <h3 class="text-2xl md:text-3xl text-white">Vos employés</h3>
      <FishemiButton
        v-if="accountStore.isAdmin || accountStore.isEditor"
        label="Importer des nouveaux employés"
        icon="pi pi-plus"
        :fullWidth="true"
        :action="triggerFileInput"
        :loading="fileUploading"
      />
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        style="display: none"
      />
    </div>

    <p class="mt-4 text-xl text-gray-500">
      Il est impossible d'importer vos employés via l'import de fichier Excel,
      ce fichier doit suivre un modèle que vous pouvez télécharger en cliquant
      <a
        href="/employees_template.csv"
        class="cursor-pointer underline underline-offset-1 text-white"
        >ici</a
      >.<br />
      Les employés que vous avez déjà importés ne seront pas supprimés.
    </p>

    <div class="flex items-center h-8 gap-6 mt-8 mb-8">
      <div class="w-full md:w-96">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchValue"
            @keyup.enter="search"
            placeholder="Rechercher un employé"
            class="bg-[#111826] border-0 p-4"
          />
        </IconField>
      </div>
      <div class="w-0.5 h-full bg-gray-400"></div>
      <div
        v-if="accountStore.isAdmin || accountStore.isEditor"
        @click="removeSelection"
      >
        <i class="pi pi-trash text-gray-400 cursor-pointer"></i>
      </div>
    </div>
    <FishemiButton
      v-if="accountStore.isAdmin || accountStore.isEditor"
      label="Supprimer tout les employés"
      icon="pi pi-trash"
      :action="removeAll"
    />
    <br />
    <EmployeeList :employees="employees" @get-employees="getEmployee" />
  </div>
</template>
