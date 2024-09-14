<template>
  <div class="flex flex-col md:flex-row">
    <div class="flex-1 p-4">
      <div class="bg-blue p-6 rounded-lg mb-4">
        <div class="flex gap-8 items-center mb-4">
          <div>
            <p class="text-4xl mb-4 font-bold text-white">{{ firstClicked }}</p>
            <p class="text-grey mb-4">Liens cliqués les dernières 24h</p>
          </div>
          <div>
            <p class="text-4xl mb-4 font-bold text-white">{{ firstOpened }}</p>
            <p class="text-grey mb-4">Emails ouvert les dernières 24h</p>
          </div>
        </div>
        <Chart
          type="line"
          :data="chartData"
          :options="chartOptions"
          class="w-full"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue p-4 rounded-lg text-center text-white">
          <p class="text-xl font-bold">{{ firstClicked }}</p>
          <p class="text-grey">Nouveaux événements</p>
        </div>
        <div class="bg-blue p-4 rounded-lg text-center text-white">
          <p class="text-xl font-bold">{{ totalCampaigns }}</p>
          <p class="text-grey">Campagnes créées</p>
        </div>
        <div class="bg-blue p-4 rounded-lg text-center text-white">
          <p class="text-xl font-bold">{{ totalEmployees }}</p>
          <p class="text-grey">Employés importés</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import { useAccountStore } from "@/stores/accountStore";

const accountStore = useAccountStore();
const totalCampaigns = ref(0);
const totalEmployees = ref(0);

const firstClicked = ref(0);
const firstOpened = ref(0);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Liens cliqués",
      backgroundColor: "rgba(255, 167, 38, 0.5)",
      borderColor: "#FFA726",
      data: [],
      fill: false,
      tension: 0.4,
    },
    {
      label: "Emails ouverts",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "#36A2EB",
      data: [],
      fill: false,
      tension: 0.4,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
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
      reverse: false,
    },
    y: {
      grid: {
        color: "#374151",
      },
      ticks: {
        color: "#9CA3AF",
        beginAtZero: true,
        callback: function (value: number) {
          return Number.isInteger(value) ? value : null;
        },
      },
    },
  },
});

const fetchData = async () => {
  try {
    const response: any = await accountStore.me();
    const data = response.data;

    totalCampaigns.value = data.total_campaigns;
    totalEmployees.value = data.total_employees;

    firstClicked.value = data.events_stats.total_clicked[0]?.value || 0;
    firstOpened.value = data.events_stats.total_opened[0]?.value || 0;
    const labels = data.events_stats.total_clicked
      .map((item: any) => item.day)
      .reverse();

    const clickedValues = data.events_stats.total_clicked
      .map((item: any) => item.value)
      .reverse();

    const openedValues = data.events_stats.total_opened
      .map((item: any) => item.value)
      .reverse();

    chartData.value.labels = labels;
    chartData.value.datasets[0].data = clickedValues;
    chartData.value.datasets[1].data = openedValues;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données", error);
  }
};

onMounted(fetchData);
</script>

<style scoped></style>
