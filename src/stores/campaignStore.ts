import { defineStore } from "pinia";
import type { Campaign } from "@/types/campaign";
import CampaignService from "@/services/CampaignService";

interface CampaignStore {
  campaigns: Campaign[]
}

export const useCampaignStore = defineStore("campaign", {
  state: (): CampaignStore => ({
    campaigns: []
  }),

  getters: {},

  actions: {
    async getAllCampaigns() {
      const response =  await CampaignService.getAllCampaigns(); 
      this.campaigns = response;
    },

    async getCampaign(campaign_id: string) {
      const response = await CampaignService.getCampaign(campaign_id);
      return response;
    },

    async createCampaign(data: {
      lists: string[];
      name: string;
      template: string;
      subject: string;
      content: string;
    }) {
      return await CampaignService.createCampaign(data);
    },

    async updateCampaign(data: {
      id: string;
      lists?: string[];
      name?: string;
      template?: string;
      subject?: string;
      content?: string;
    }) {
      return await CampaignService.updateCampaign(data);
    },

    async deleteCampaign(campaign_id: string) {
      return await CampaignService.deleteCampaign(campaign_id);
    },

    async createCheckout(campaign_id: string) {
      return await CampaignService.createCheckout(campaign_id);
    },

    async calculatePrice(lists: string[]) {
      return await CampaignService.calculatePrice(lists);
    },

    async generateContent() {
      return await CampaignService.generateContent();
    },

    async validatePayment(payment_id: string) {
      return await CampaignService.validatePayment(payment_id);
    },
  },
});
