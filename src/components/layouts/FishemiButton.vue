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
    <Button
      :icon="props.icon"
      :label="props.label"
      @click="props.action"
      class="custom-button"
    />
  </div>
</template>

<style>
.custom-button {
  background: radial-gradient(circle, #e9ff90 0%, #ccff00 40%);
  border: none;
  color: black;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 25px 14px;
  border-radius: 8px;
  transition: background 0.3s ease;
}
.custom-button > span {
  font-family: "Aeonik", sans-serif !important;
  font-weight: 500 !important;
}
</style>
