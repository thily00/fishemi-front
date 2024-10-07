<script setup lang="ts">
//eslint-disable
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { ref, type Ref, onMounted, computed } from "vue";
import { useListStore } from "@/stores/listStore";
import FishemiModal from "@/components/layouts/FishemiModal.vue";
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import { useToastService }  from '@/services/ToastService';
import ListList from "@/components/lists/ListList.vue";
import { useAccountStore } from "@/stores/accountStore";


const { showToast } = useToastService();
const accountStore = useAccountStore();
const searchValue: Ref<string> = ref("");
const newListName: Ref<string> = ref("");
const isAddModalVisible: Ref<boolean> = ref(false);
const listStore = useListStore();

const getLists = async () => {
  await listStore.getAllLists();
};

const addList = async () => {
  const response = await listStore.createList(newListName.value);
  if (response?.status === 201) {
    await getLists();
    isAddModalVisible.value = false;
    newListName.value = "";
    showToast({
      severity: "success",
      summary: "Ajout réussi",
      detail: "Les données ont été ajoutées avec succès.",
      life: 3000,
    });
  }
};

const removeSelection = async () => {
  const listIds = listStore.selectedLists;
  const response = await listStore.deleteList(listIds);
  if (response === "success") {
    await getLists();
    listStore.setSelectionList([]);
    showToast({
      severity: "success",
      summary: "Suppression réussie",
      detail: "Les données ont été supprimées avec succès.",
      life: 3000,
    });
  }
};

const search = async () => {
  const response = await listStore.searchList(searchValue.value);
  if (response?.status === 200) {
    if (listStore.lists.length === 0) {
      getLists();
    }
  }
};

const openCreateListModal = () => {
  isAddModalVisible.value = true;
};

onMounted(() => {
  getLists();
});

const lists = computed(() => listStore.lists);
</script>
<template>
  <div class="w-full h-full p-4 md:p-10 bg-blue rounded-lg">
    <div
      class="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4"
    >
      <h3 class="text-2xl md:text-3xl text-white">Vos listes</h3>
      <FishemiButton
        v-if="accountStore.isAdmin || accountStore.isEditor"
        label="Créer une nouvelle liste"
        icon="pi pi-plus"
        :fullWidth="true"
        :action="openCreateListModal"
        class="w-auto"
      />
    </div>

    <p class="mt-4 text-lg md:text-xl text-gray-500">
      Vous pouvez créer plusieurs listes, chacune contenant le nombre d'employés
      que vous souhaitez. Lors de la programmation d'une campagne, vous
      choisirez une liste d'employés pour envoyer la campagne.
    </p>

    <div class="flex flex-row items-center gap-2 mt-8 mb-8">
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
      <div class="w-0.5 h-full bg-gray-400"></div>
      <div v-if="accountStore.isAdmin || accountStore.isEditor" @click="removeSelection">
        <i class="pi pi-trash text-gray-400 cursor-pointer"></i>
      </div>
    </div>
    <ListList :lists="lists" @get-lists="getLists" />
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
