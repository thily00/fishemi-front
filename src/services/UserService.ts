import { handleError } from '@/utils/ErrorHandler';
import { axiosInstance } from '@/services/AxiosService';

export default {
    /**
     * Get the user information
     */
    async getuserInfo() {
        try {
          const response = await axiosInstance().get("/account/me")
          return response.data;
        } catch (error) {
            return handleError(error, { message: "Échec de la récupération des paramètres", logError: true });
        }
    },

};
