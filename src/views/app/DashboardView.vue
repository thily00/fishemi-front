<template>
  <div class="flex flex-col md:flex-row">
    <!-- <Sidebar :sidebarVisible="sidebarVisible" /> -->
    <div class="flex-1 p-4">
      <!-- <Header @toggle-sidebar="toggleSidebar" /> -->
      <div class="bg-blue p-6 rounded-lg mb-4">
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-4xl mb-4 font-bold text-white">{{ totalClicked }}</p>
            <p class="text-grey mb-4">Liens cliqués les dernières 24h</p>
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
          <p class="text-xl font-bold">{{ totalEvents }}</p>
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
import { axiosInstance } from "@/services/AxiosService";

const accountStore = useAccountStore();
const totalClicked = ref(0);
const totalEvents = ref(0);
const totalCampaigns = ref(0);
const totalEmployees = ref(0);
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

const fetchData = async () => {
  try {
    const response = await axiosInstance().get("/account/me");
    const data = response.data;

    accountStore.setAccount(data.personal_data);

    totalClicked.value = data.events_stats.total_today;
    totalEvents.value = data.events_stats.total_today;
    totalCampaigns.value = data.total_campaigns;
    totalEmployees.value = data.total_employees;

    const labels = data.events_stats.total_clicked.map((item: any) => item.day);
    const values = data.events_stats.total_clicked.map(
      (item: any) => item.value
    );
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = values;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données", error);
  }
};

onMounted(fetchData);
</script>

<style scoped></style>
