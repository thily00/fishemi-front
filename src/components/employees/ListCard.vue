<script setup lang="ts">
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

const props = defineProps({
  id: String,
  name: String,
  email: String,
});

const checked = ref(false);
const showEditForm = ref(false);

const importer = () => {
  console.log('importer')
}

const toggleCard = () => {
  showEditForm.value = !showEditForm.value;
}

</script>

<template>
    <div class="w-full bg-background rounded-md p-5 flex flex-col">
      
      <transition name="fade" mode="out-in">
        <div class="flex items-center w-full justify-between" v-if="!showEditForm">     
          <div class="flex items-center gap-6">
              <Checkbox v-model="checked" :binary="true" class="bg-blue rounded-sm" />
              <i class="pi pi-user fishemi-text-color" style="font-size: 1.75rem"></i>
              <div>
                  <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
                  <h6 class="text-gray-400">{{$props.email}}</h6>
              </div>
          </div>
          
          <div class="flex gap-4 items-center">
              <FishemiButton
                label="Modifier"
                icon="pi pi-pencil"
                type="secondary"
                :fullWidth=true
                :action="toggleCard"
              />
      
              <FishemiButton
                label="Supprimer"
                icon="pi pi-trash"
                type="primary"
                :fullWidth=true
                :action="importer"
              />
          </div>
        </div>
      </transition>

      <transition name="fade" mode="out-in">
        <div class="w-full flex flex-col" v-if="showEditForm">
          <div class="flex items-center gap-6">
            <i class="pi pi-times text-gray-400 text-2xl cursor-pointer" @click="toggleCard"></i>
            <div class="w-0.5 min-h-6 bg-gray-400"></div>
            <i class="pi pi-user fishemi-text-color text-2xl cursor-pointer"></i>
            <div>
              <h1 class="fishemi-text-color text-xl mb-1">{{ props.name }}</h1>
              <h6 class="text-gray-400">{{$props.email}}</h6>
            </div>
          </div>
  
          <div class="form flex flex-col flex-start">
  
            <div class="flex my-8 gap-4">
              <div class="w-full flex flex-col gap-2 text-white">
                <label for="email">Nom</label>
                <InputText
                  id="name"
                  class="mb-2 bg-background border-slate-700" />
              </div>
              <div class=" w-full flex flex-col gap-2 text-white">
                <label for="email">E-mail</label>
                <InputText
                  id="email"
                  class="mb-2 bg-background border-slate-700" />
              </div>
            </div>
  
            <FishemiButton
            label="Enregistrer"
            :action="importer"/>
            
          </div>
         
        </div>
      </transition>

    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>


