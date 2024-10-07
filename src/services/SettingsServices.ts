import { handleError } from '@/utils/ErrorHandler';
import { axiosInstance } from '@/services/AxiosService';

export default {
    /**
     * Get the company settings
     */
    async getSettings() {
        try {
          const response = await axiosInstance().get("/settings");
          return response.data;
         
        } catch (error) {
            return handleError(error, { message: "Échec de la récupération des paramètres", logError: true });
        }
    },

    /**
     * Create a new manager
     * @param email
     * @param full_name 
     * @param roles 
     * @returns 
     */
    async addManager(email: string, full_name: string, roles: string) {
        try {
          return await axiosInstance().post("/settings/manager", {
            email, full_name, roles
          });
        } catch (error) {
            return handleError(error, { message: "Échec de la création du gestionnaire", logError: true });
        }
    },
      
    /**
     * Update company settings
     * @param companyName The name of the company
     */
    async saveSettings(companyName: string) {
        try {
          await axiosInstance().patch("/settings", {
            company_name: companyName,
          });
        } catch (error) {
            return handleError(error, { message: "Échec de la sauvegarde des paramètres", logError: true });
        }
    },

    /**
     *  Delete a list of gestionnaires
     * @param gestionnairesIds The ids of the gestionnaires to delete 
     */
    async deleteGestionnaire(gestionnairesIds: string[]) {
        try {
            return await axiosInstance().delete("/settings/manager", {
                params: {
                    "manager-id": gestionnairesIds[0],
                },
            });
        } catch (error) {
            return handleError(error, { message: "Échec de la suppression du gestionnaire", logError: true });
        }
    }
};
