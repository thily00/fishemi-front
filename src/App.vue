<script setup lang="ts">
import { RouterView } from 'vue-router'


import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext'; 

</script>

<template>
  <h1 className="text-4xl font-bold underline">
    Hello world!
  </h1>

  <div class="card flex flex-wrap justify-center gap-3">
    <IconField iconPosition="left">
        <InputIcon>
            <i class="pi pi-search" />
        </InputIcon>
        <InputText  placeholder="Search" />
    </IconField>

    <IconField>
        <InputIcon>
            <i class="pi pi-spin pi-spinner" />
        </InputIcon>
        <InputText  />
    </IconField>
</div>

  <RouterView />
</template>
