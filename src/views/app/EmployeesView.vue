<script setup lang="ts">
import { ref } from 'vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import FishemiButton from "@/components/layouts/FishemiButton.vue";
import EmployeeList from '@/components/employees/EmployeeList.vue';
import { employees } from '@/utils/constants';

const searchValue = ref('');
const checked = ref(false);

const importer = () => {
    console.log('importing employees');
}
</script>
<template>
    <div class="w-full h-full rounded-lg bg-blue p-10">

        <div class="flex justify-between items-center">
            <h3 class="text-3xl text-white">Vos employés</h3>
            <FishemiButton
            label="Importer des nouveax  employés"
            :fullWidth=true
            :action="importer"
            />
        </div>  
        <p class="mt-4 text-xl text-gray-500">Il est impossible d'importer vos employés via l'import de fichier Excel, ce fichier doit suivre un modèle que vous pouvez télécharger en cliquant ici.</p>

        <div class="flex items-center h-8 gap-6 mt-8 mb-8">
            <div class="w-96">
                <IconField>
                    <InputIcon class="pi pi-search"/>
                    <InputText v-model="searchValue" placeholder="Rechercher un employé" class="bg-[#111826] border-0 p-4" />
                </IconField>
            </div>

            <div class="w-0.5 h-full bg-gray-400"></div>

            <div>
                <i class="pi pi-trash text-gray-400 cursor-pointer"></i>
            </div>
        </div>

        <EmployeeList />
    </div>
</template>