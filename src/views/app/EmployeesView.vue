<script setup lang="ts">
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { ref, type Ref, onMounted } from "vue";
import type { Employee } from "@/types/employee";
import { useEmployeeStore } from "@/stores/employeeStore";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import EmployeeList from "@/components/employees/EmployeeList.vue";
import { useAccountStore } from "@/stores/accountStore";

const toast = useToast();
const accountStore = useAccountStore();
const searchValue: Ref<string> = ref("");
const fileUploading: Ref<boolean> = ref(false);
const fileInput: Ref<HTMLInputElement | null> = ref(null);
const employeeStore = useEmployeeStore();
const employees: Ref<Employee[]> = ref([]);

const getEmployee = async () => {
  const response: any = await employeeStore.getAllEmployees();
  if (response.status === 200) {
    employees.value = employeeStore.employeeList;
  }
};

onMounted(() => {
  getEmployee();
});

const triggerFileInput = (): void => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const search = async () => {
  const response: any = await employeeStore.searchEmployee(searchValue.value);
  if (response.status === 200) {
    if (response.data.length === 0) {
      getEmployee();
    }
    employees.value = response.data;
  }
};

const removeSelection = async () => {
  try {
    const employeeIds = employeeStore.selectedEmployees;
    const response: any = await employeeStore.deleteEmployee(employeeIds);
    if (response.status === 200) {
      await getEmployee();
      employeeStore.setSelectionList([]);
      toast.add({
        severity: "success",
        summary: "Suppression réussie",
        detail: "Les données ont été supprimées avec succès.",
        life: 3000,
      });
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Une erreur est survenue lors de la suppression.",
      life: 3000,
    });
  }
};

const removeAll = () => {
  employeeStore.setSelectionList(
    employees.value.map((employee) => employee.id)
  );
  removeSelection();
};

const handleFileUpload = async (event: Event): Promise<void> => {
  fileUploading.value = true;
  const targuet = event.target as HTMLInputElement;
  const file: File | null = targuet.files ? targuet.files[0] : null;

  try {
    if (file) {
      const response: any = await employeeStore.importEmployees(file);
      if (response.status === 201) {
        getEmployee();
        toast.add({
          severity: "success",
          summary: "Importation réussie",
          detail: "Les données ont été importées avec succès.",
          life: 3000,
        });
      }
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Une erreur est survenue lors de l'importation des données.",
      life: 3000,
    });
  } finally {
    fileUploading.value = false;
  }
};
</script>
<template>
  <div class="w-full h-full rounded-lg bg-blue p-10">
    <div class="flex justify-between items-center">
      <h3 class="text-3xl text-white">Vos employés</h3>
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
        href="/public/employees_template.csv"
        class="cursor-pointer underline underline-offset-1 text-white"
        >ici</a
      >.<br />
      Les employés que vous avez déjà importés ne seront pas supprimé.
    </p>

    <div class="flex items-center h-8 gap-6 mt-8 mb-8">
      <div class="w-96">
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
      <div v-if="accountStore.isAdmin || accountStore.isEditor" @click="removeSelection">
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
