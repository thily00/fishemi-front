<template>
  <ul>
    <li
      v-for="(event, index) in events"
      :key="index"
      class="flex justify-between items-center text-white mb-4 bg-dark rounded-md"
    >
      <div
        class="w-full bg-background rounded-md p-5 flex justify-between items-center"
      >
        <div class="flex items-center gap-4">
          <i
            class="pi pi-user fishemi-text-color"
            style="font-size: 1.5rem"
          ></i>
          <div>
            <span class="block fishemi-text-color mb-2 font-bold">
              {{ event.employee_full_name }}
            </span>
            <span class="text-grey">{{ event.employee_email }}</span>
          </div>
          <span class="block text-grey">{{ getEventPhrase(event.type) }}</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-grey">{{
            new Date(event.date).toLocaleString()
          }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const getEventPhrase = (type: string) => {
  switch (type) {
    case "opened":
      return "à ouvert le lien";
    case "sent":
      return "à envoyé le lien";
    case "clicked":
      return "à cliqué sur le lien";
    default:
      return "";
  }
};
</script>
