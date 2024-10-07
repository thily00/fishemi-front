import { handleError } from '@/utils/ErrorHandler';
import { axiosInstance } from "@/services/AxiosService";


export default {
    /**
     * Get all campaigns
     */
    async getAllCampaigns(): Promise<any> {
        try {
            const response = await axiosInstance().get("/campaign");
            return response.data;
        } catch (error) {
            return handleError(error, { message: "Échec de la récupération des campagnes", logError: true });
        }
    },

    /**
     * Get a campaign by its ID
     * @param campaign_id The ID of the campaign
     */
    async getCampaign(campaign_id: string): Promise<any> {
        try {
            const response = await axiosInstance().get(`/campaign/find-one?id=${campaign_id}`);
            return response.data;
        } catch (error) {
            return handleError(error, { message: `Échec de la récupération de la campagne ${campaign_id}`, logError: true });
        }
    },

    /**
     * Create a new campaign
     * @param data The data of the campaign
     */
    async createCampaign(data: {
        lists: string[];
        name: string;
        template: string;
        subject: string;
        content: string;
    }): Promise<any> {
        try {
            return await axiosInstance().post("/campaign/new", data);
        } catch (error) {
            return handleError(error, { message: "Échec de la création de la campagne", logError: true });
        }
    },

    /**
     * Update a campaign
     * @param data The data of the campaign
     */
    async updateCampaign(data: {
        id: string;
        lists?: string[];
        name?: string;
        template?: string;
        subject?: string;
        content?: string;
    }): Promise<any> {
        try {
            return await axiosInstance().patch("/campaign", data);
        } catch (error) {
            return handleError(error, { message: `Échec de la mise à jour de la campagne ${data.id}`, logError: true });
        }
    },
  
    /**
     *  Delete a campaign
     * @param campaignId  The ID of the campaign 
     */
    async deleteCampaign(campaignId: string): Promise<any> {
        try {
            return await axiosInstance().delete(`/campaign/delete/?id=${campaignId}`);
        } catch (error) {
            handleError(error, { message: `Échec de la suppression de la campagne avec l'ID ${campaignId}`, logError: true });
        }
    },

    /**
     * Delete a campaign
     * @param campaignIds The IDs of the campaigns to delete
     */
    async createCheckout(campaign_id: string): Promise<any> {
        try {
            return await axiosInstance().get(`/campaign/create-checkout/?campaign_id=${campaign_id}`);
        } catch (error) {
            return handleError(error, { message: `Échec de la création du checkout pour la campagne ${campaign_id}`, logError: true });
        }
    },

    /**
     * Calculate the price of a campaign
     * @param lists The lists of the campaign
     */
    async calculatePrice(lists: string[]): Promise<any> {
        try {
            return await axiosInstance().post("/campaign/calculate", { lists });
        } catch (error) {
            return handleError(error, { message: "Échec du calcul du prix de la campagne", logError: true });
        }
    },

    /**
     * Generate the content of a campaign
     */
    async generateContent(): Promise<any> {
        try {
            return await axiosInstance().get("/campaign/generate-content");
        } catch (error) {
            return handleError(error, { message: "Échec de la génération du contenu", logError: true });
        }
    },

    /**
     * Validate a payment
     * @param payment_id The ID of the payment
     */
    async validatePayment(payment_id: string): Promise<any> {
        try {
            return await axiosInstance().post(`/campaign/validate-checkout?payment_id=${payment_id}`);
        } catch (error) {
            return handleError(error, { message: `Échec de la validation du paiement ${payment_id}`, logError: true });
        }
    },
};
