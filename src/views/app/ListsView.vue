<script setup lang="ts">
//eslint-disable
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import type { List } from "@/types/list";
import { ref, type Ref, onMounted } from "vue";
import { useListStore } from "@/stores/listStore";
import FishemiModal from "@/components/layouts/FishemiModal.vue";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import ListList from "@/components/lists/ListList.vue";

const toast = useToast();
const searchValue: Ref<string> = ref("");
const newListName: Ref<string> = ref("");
const isAddModalVisible: Ref<boolean> = ref(false);

const listStore = useListStore();
const lists: Ref<List[]> = ref([]);

onMounted(() => {
  getLists();
});

const createList = () => {
  isAddModalVisible.value = true;
};

const addList = async () => {
  try {
    const response: any = await listStore.createList(newListName.value);
    if (response.status === 201) {
      await getLists();
      isAddModalVisible.value = false;
      newListName.value = "";
      toast.add({
        severity: "success",
        summary: "Ajout réussi",
        detail: "Les données ont été ajoutées avec succès.",
        life: 3000,
      });
    }
  } catch (error: any) {
    console.log(error);
    const message =
      error.response.data.message || "Une erreur est survenue lors de l'ajout.";
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: message,
      life: 3000,
    });
  }
};

const getLists = async () => {
  const response: any = await listStore.getAllLists();
  if (response.status === 200) {
    lists.value = listStore.lists;
  }
};

const search = async () => {
  const response: any = await listStore.searchList(searchValue.value);
  if (response.status === 200) {
    if (response.data.length === 0) {
      getLists();
    }
    lists.value = response.data;
  }
};
</script>
<template>
  <div class="w-full h-full p-4 md:p-10 bg-blue rounded-lg">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <h3 class="text-2xl md:text-3xl text-white">Vos listes</h3>
      <FishemiButton
        label="Créer une nouvelle liste"
        icon="pi pi-plus"
        :fullWidth="true"
        :action="createList"
        class="w-full md:w-auto"
      />
    </div>

    <p class="mt-4 text-lg md:text-xl text-gray-500">
      Vous pouvez créer plusieurs listes, chacune contenant le nombre d'employés
      que vous souhaitez. Lors de la programmation d'une campagne, vous
      choisirez une liste d'employés pour envoyer la campagne.
    </p>

    <div class="flex flex-col md:flex-row items-center gap-4 mt-8 mb-8">
      <div class="w-full md:w-96">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchValue"
            @keyup.enter="search"
            placeholder="Rechercher une liste"
            class="bg-background border-0 p-4 w-full"
          />
        </IconField>
      </div>
      <div class="hidden md:block w-0.5 h-full bg-gray-400"></div>
      <div>
        <i class="pi pi-trash text-gray-400 cursor-pointer"></i>
      </div>
    </div>
    <ListList :lists="lists" :getLists="getLists" />
    <FishemiModal
      :isVisible="isAddModalVisible"
      @close="isAddModalVisible = false"
    >
      <div class="flex flex-col gap-6">
        <h1 class="text-xl md:text-2xl text-white">Créer une nouvelle liste</h1>
        <div class="form flex flex-col gap-2">
          <div class="w-full flex flex-col gap-2 text-white">
            <label for="name">Nom</label>
            <InputText
              id="name"
              v-model="newListName"
              class="mb-2 bg-background border-slate-700 w-full"
              placeholder="Nom de la liste"
            />
          </div>
          <FishemiButton label="Enregistrer" :action="addList" class="w-full" />
        </div>
      </div>
    </FishemiModal>
  </div>
</template>
