<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import { useToast } from "primevue/usetoast";
import type { Gestionnaire } from "@/types/gestionnaire";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import SettingsList from "@/components/parametres/SettingsList.vue";
import { axiosInstance } from "@/services/AxiosService";

const toast = useToast();
const searchValue: Ref<string> = ref("");
const fileUploading: Ref<boolean> = ref(false);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

const companyName: Ref<string> = ref("");
const email: Ref<string> = ref("");

const managerName: Ref<string> = ref("");
const managerEmail: Ref<string> = ref("");
const managerRoles: Ref<string> = ref("");

const gestionnaires: Ref<Gestionnaire[]> = ref([]);

const rights = ref({
  read: false,
  write: false,
});

const fetchSettings = async () => {
  try {
    const response = await axiosInstance().get("/settings");
    const data = response.data;
    companyName.value = data.company_name;
    email.value = data.email;
    gestionnaires.value = data.admins.map((admin: any) => ({
      id: admin.id,
      full_name: admin.full_name,
      email: admin.email,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres:", error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Impossible de récupérer les paramètres.",
    });
  }
};

onMounted(() => {
  fetchSettings();
});

const handleCheckboxChange = (type: string, checked: boolean) => {
  console.log("gggg", type, checked);
  if (type === "read" && checked == true) {
    rights.value.read = true;
    rights.value.write = false;
  } else {
    rights.value.read = false;
    rights.value.write = true;
  }
  if (type === "write" && checked == true) {
    rights.value.read = false;
    rights.value.write = true;
  } else {
    rights.value.read = true;
    rights.value.write = false;
  }
};

const createManager = async () => {
  try {
    await axiosInstance().post("/settings/manager", {
      email: managerEmail.value,
      full_name: managerName.value,
      roles: rights.value.write ? "lector,writer" : "lector",
    });
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Gestionnaire créé avec succès.",
    });
    fetchSettings();
  } catch (error) {
    console.error("Erreur lors de la création du gestionnaire:", error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Impossible de créer le gestionnaire.",
    });
  }
};

const saveSettings = async () => {
  try {
    await axiosInstance().patch("/settings", {
      company_name: companyName.value,
    });
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Nom de l'entreprise sauvegardé avec succès.",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde du nom de l'entreprise:",
      error
    );
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Impossible de sauvegarder le nom de l'entreprise.",
    });
  }
};
</script>

<template>
  <div class="w-full h-full rounded-lg bg-blue p-10">
    <div class="flex justify-between items-center">
      <h3 class="text-3xl text-white">Paramètres</h3>
    </div>
    <div class="form flex flex-col flex-start my-4">
      <div class="flex flex-col my-4 gap-4">
        <div class="w-full flex flex-col gap-2 text-white">
          <label for="companyName">Nom de l'entreprise</label>
          <InputText
            id="companyName"
            v-model="companyName"
            class="mb-2 bg-background border-slate-700"
          />
        </div>
      </div>
      <FishemiButton
        class="flex justify-center"
        label="Sauvegarder"
        @click="saveSettings"
      />
    </div>

    <!-- Formulaire de création d'un nouveau gestionnaire -->
    <div class="my-12">
      <div class="flex justify-between">
        <h3 class="text-3xl text-white">Créer un nouveau gestionnaire</h3>
      </div>
      <p class="mt-4 text-xl text-gray-500">
        Vous pouvez créer des gestionnaires de l’organisation avec différents
        droits d’accès.
      </p>
    </div>

    <div class="w-full bg-background rounded-md p-5 my-8 flex flex-col">
      <div class="flex items-center gap-6">
        <i class="pi pi-times text-gray-400 text-2xl cursor-pointer"></i>
        <div class="w-0.5 min-h-6 bg-gray-400"></div>
        <i class="pi pi-user fishemi-text-color text-2xl cursor-pointer"></i>
      </div>

      <div class="form flex flex-col flex-start my-4">
        <div class="flex my-4 gap-4">
          <div class="w-full flex flex-col gap-2 text-white">
            <label for="name">Nom</label>
            <InputText
              id="name"
              v-model="managerName"
              class="mb-2 bg-background border-slate-700"
            />
          </div>
          <div class="w-full flex flex-col gap-2 text-white">
            <label for="email">E-mail</label>
            <InputText
              id="email"
              v-model="managerEmail"
              class="mb-2 bg-background border-slate-700"
            />
          </div>
        </div>

        <div class="flex my-4 gap-4">
          <div class="w-full flex flex-col gap-2 text-white">
            <label>Droit</label>
            <div class="flex justify-between gap-4">
              <div
                class="w-full flex items-center p-4 gap-2 rounded-lg bg-blue"
              >
                <Checkbox
                  :modelValue="rights.read"
                  @update:modelValue="handleCheckboxChange('read', $event)"
                  :binary="true"
                  inputId="readCheckbox"
                  class="bg-background border-slate-700"
                />
                <label for="readCheckbox" class="text-white">Lecture</label>
              </div>

              <div
                class="w-full flex items-center p-4 gap-2 rounded-lg bg-blue"
              >
                <Checkbox
                  :modelValue="rights.write"
                  @update:modelValue="handleCheckboxChange('write', $event)"
                  :binary="true"
                  inputId="writeCheckbox"
                  class="bg-background border-slate-700"
                />
                <label for="writeCheckbox" class="text-white">Ecriture</label>
              </div>
            </div>
          </div>
        </div>
        <FishemiButton
          class="flex justify-center"
          label="Enregistrer le nouveau gestionnaire"
          @click="createManager"
        />
      </div>
    </div>

    <div class="flex justify-between items-center">
      <h3 class="text-3xl text-white">Gestionnaires</h3>
    </div>

    <SettingsList :gestionnaires="gestionnaires" />
  </div>
</template>
