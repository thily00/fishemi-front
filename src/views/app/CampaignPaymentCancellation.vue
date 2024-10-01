<template>
  <div
    class="w-full min-h-[80vh] flex justify-center flex-col h-full rounded-lg bg-blue p-10"
  >
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import { onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

onMounted(() => {
  toast.add({
    severity: "success",
    summary: "Paiement annulé",
    detail: "Votre paiement a été annulé avec succès.",
    life: 3000,
  });
  router.push("/campagnes");
});
</script>
