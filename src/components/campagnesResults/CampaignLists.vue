<template>
  <ul>
    <li
      v-for="(list, index) in lists"
      :key="index"
      class="flex justify-between items-center text-white mb-4 bg-dark rounded-md"
    >
      <div
        class="w-full bg-background rounded-md p-5 flex justify-between items-center"
      >
        <div class="flex items-center gap-4">
          <i
            class="pi pi-users fishemi-text-color"
            style="font-size: 1.5rem"
          ></i>
          <div>
            <span class="block fishemi-text-color mb-2 font-bold">
              {{ list.name }}
            </span>
            <span class="text-grey">{{ list.employee_count }} membres</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  lists: {
    type: Array,
    required: true,
  },
});
</script>
