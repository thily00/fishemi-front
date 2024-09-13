// stores/useCampaignStore.ts
import { defineStore } from "pinia";
import { axiosInstance } from "@/services/AxiosService";

interface CampaignStore {
  campaign: [];
}

export const useCampaignStore = defineStore("campaign", {
  state: (): CampaignStore => ({
    campaign: [],
  }),

  getters: {},

  actions: {
    createCampaign(data: {
      lists: string[];
      name: string;
      template: string;
      subject: string;
      content: string;
    }) {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .post("/campaign/new", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    createCheckout(campaign_id: string) {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .get(`/campaign/create-checkout/?campaign_id=${campaign_id}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    calculatePrice(lists: string[]) {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .post("/campaign/calculate", { lists })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    generateContent() {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .get("/campaign/generate-content")
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    validatePayment(payment_id: string) {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .post(`/campaign/validate-checkout?payment_id=${payment_id}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
