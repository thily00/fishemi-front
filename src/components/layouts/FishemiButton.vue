<script setup lang="ts">
import Button from "primevue/button";

const props = defineProps({
  icon: String,
  label: String,
  action: Function,
});
</script>
<template>
  <div class="card flex justify-center">
    <Button :icon="props.icon" :label="props.label" @click="props.action" />
  </div>
</template>
