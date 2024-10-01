<script setup lang="ts">
import Button from "primevue/button";

const props = defineProps({
  icon: String,
  label: String,
  action: Function,
  loading: Boolean,
  type: {
    type: String as () => "primary" | "secondary",
    default: "primary",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  parentCustomClass: {
    type: String,
    default: "",
  },
  buttonCustomClass: {
    type: String,
    default: "",
  },
});
</script> 

<template>
  <div :class="['card flex', parentCustomClass]" >
    <Button
      :icon="props.icon"
      :label="props.label"
      :loading="props.loading ? props.loading : false"
      :class="[
        { 'w-full': props.fullWidth },
        'custom-button',
        buttonCustomClass,
        $props.type === 'primary' ? 'primary' : 'secondary',
      ]"
      @click="props.action"
    />
  </div>
</template>

<style>
.custom-button {
  border: none;
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

.custom-button .pi {
  font-family: primeicons !important;
}

.primary {
  background: radial-gradient(circle, #e9ff90 0%, #ccff00 40%);
  color: black;
}

.secondary {
  background: var(--blue);
  color: #ccff00;
}
</style>
