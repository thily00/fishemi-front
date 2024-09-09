<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const close = () => {
  emit('close');
}
</script>
<template>
    <div v-if="props.isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <slot></slot>
        <div class="absolute top-8 right-8 cursor-pointer" @click="close" >
            <i class="pi pi-times text-white"></i>
        </div>
        <!-- <button @click="close">Fermer</button> -->
      </div>
    </div>
</template> 
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    position: relative;
    background: var(--blue);
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
  }
  </style>
  