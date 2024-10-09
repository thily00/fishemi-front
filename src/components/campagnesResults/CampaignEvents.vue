<script setup lang="ts">
import { type CampaignEvent } from "@/types/campaignResults";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

const props = defineProps<{
  events: CampaignEvent[];
}>();

const getEventPhrase = (type: string) => {
  switch (type) {
    case "opened":
      return "à cliqué sur le lien";
    case "sent":
      return "à reçu le mail";
    case "clicked":
      return "à cliqué sur le lien";
    default:
      return "";
  }
};

const formatEventDate = (dateString: string): string => {
  const eventDate = dayjs(dateString);
  const now = dayjs();

  if (eventDate.isSame(now, "day")) {
    return `Aujourd'hui à ${eventDate.format("HH:mm")}`;
  }

  return eventDate.format("DD MMM YYYY à HH:mm");
};
</script>

<template>
  <ul>
    <li
      v-for="(event, index) in props.events"
      :key="index"
      class="flex justify-between items-center text-white mb-4 bg-dark rounded-md"
    >
      <div
        class="w-full flex-col md:flex-row gap-4 bg-background rounded-md p-5 flex justify-between items-center"
      >
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="flex gap-4">
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
          </div>
          <span class="block text-grey">{{ getEventPhrase(event.type) }}</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-grey">{{ formatEventDate(event.date) }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
