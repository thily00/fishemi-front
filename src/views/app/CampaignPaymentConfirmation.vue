<template>
  <div
    class="w-full min-h-[80vh] flex justify-center flex-col h-full rounded-lg bg-blue p-10"
  >
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import { useCampaignStore } from "@/stores/campaignStore";
import { onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const campaignStore = useCampaignStore();

onMounted(() => {
  const payment_id = route.query.identifiant;
  verifyPayment(payment_id as string);
});

const verifyPayment = async (payment_id: string) => {
  try {
    await campaignStore.validatePayment(payment_id);
    toast.add({
      severity: "success",
      summary: "Paiement validé",
      detail: "Votre paiement a été validé avec succès.",
      life: 3000,
    });
    router.push("/campagnes");
  } catch (error) {
    console.error("Erreur lors de la validation du paiement:", error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Impossible de valider le paiement.",
      life: 3000,
    });
    router.push("/campagnes");
  }
};
</script>
