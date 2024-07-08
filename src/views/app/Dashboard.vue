<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-4">
      <div class="bg-blue p-6 rounded-lg mb-4">
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-4xl mb-4 font-bold text-white">0</p>
            <p class="text-grey mb-4">Liens cliqués les dernières 24h</p>
          </div>
        </div>
        <Chart
          type="line"
          :data="chartData"
          :options="chartOptions"
          class="h-[30rem]"
        />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-blue p-4 rounded-lg text-center text-white">
          <p class="text-xl font-bold">0</p>
          <p class="text-grey">Nouveaux événements</p>
        </div>
        <div class="bg-blue p-4 rounded-lg text-center text-white">
          <p class="text-xl font-bold">0</p>
          <p class="text-grey">Campagnes créées</p>
        </div>
        <div class="bg-blue p-4 rounded-lg text-center text-white">
          <p class="text-xl font-bold">7</p>
          <p class="text-grey">Employés importés</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/layouts/Sidebar.vue";
import Chart from "primevue/chart";
import { ref } from "vue";

const chartData = ref({
  labels: [
    "01 Feb",
    "02 Feb",
    "03 Feb",
    "04 Feb",
    "05 Feb",
    "06 Feb",
    "07 Feb",
  ],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "rgba(255, 167, 38, 0.5)",
      borderColor: "#FFA726",
      data: [6600, 6400, 6200, 6300, 6600, 6800, 6600],
      fill: false,
      tension: 0.4,
    },
    {
      label: "Dataset 2",
      backgroundColor: "rgba(66, 165, 245, 0.5)",
      borderColor: "#42A5F5",
      data: [6000, 6200, 6100, 6400, 6200, 6000, 5900],
      fill: false,
      tension: 0.4,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "#374151",
      },
      ticks: {
        color: "#9CA3AF",
      },
    },
  },
});
</script>

<style scoped></style>
