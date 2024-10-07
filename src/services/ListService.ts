import type { List } from '@/types/list';
import { handleError } from '@/utils/ErrorHandler';
import { axiosInstance } from '@/services/AxiosService';

export default {
    /**
     * Create a new list
     * @param name The name of the list
     */
    async createList(name: string): Promise<any> {
        try {
            const body = { name };
            return await axiosInstance().post('/list', body);
        } catch (error) {
            return handleError(error, { message: 'Échec de la création de la liste', logError: true });
        }
    },

    /**
     * Get all lists
     */
    async getAllLists(): Promise<List[]> {
        try {
            const response = await axiosInstance().get('/list');
            return response.data;
        } catch (error) {
            return handleError(error, { message: 'Échec de la récupération des listes', logError: true });
        }
    },


    /**
     * Update a list
     * @param list The list to update
     */
    async updateList(list: List): Promise<any> {
        try {
            return await axiosInstance().patch(`/list`, list);
        } catch (error) {
            return handleError(error, { message: 'Échec de la mise à jour de la liste', logError: true });
        }
    },

    /**
     * Delete a list
     * @param listIds The ids of the lists to delete
     */
    async deleteList(listIds: string[]): Promise<any> {
        try {
            const deletePromises = listIds.map(async (listId) => {
                try {
                  return await axiosInstance().delete(`/list/?id=${listId}`);
                } catch (error) {
                  handleError(error, { message: `Échec de la suppression de la liste avec l'ID ${listId}`, logError: true });
                  throw error;
                }
            });
        
            return await Promise.all(deletePromises);
        } catch (error) {
            return handleError(error, { message: 'Échec de la suppression des listes', logError: true });
        }
    },

    /**
     * Search for a list by name
     * @param name The name of the list to search
     */
    async searchList(name: string): Promise<any> {
        try {
            return await axiosInstance().get(`/list/search?name=${name}`);
        } catch (error) {
            return handleError(error, { message: 'Échec de la recherche des listes', logError: true });
        }
    },

    /**
     * Add an employee to a list
     * @param list_id The id of the list
     * @param employee_id The id of the employee
     * 
     */
    async addEmployeeToList(list_id: string, employee_id: string): Promise<any> {
        try {
            const body = { list_id, employee_id };
            return await axiosInstance().post('/list/employee', body);
        } catch (error) {
            return handleError(error, { message: 'Échec de l\'ajout de l\'employé à la liste', logError: true });
        }
    },

    /**
     * Remove an employee from a list
     * @param list_id The id of the list
     * @param employee_id The id of the employee
     */
    async removeEmployee(list_id: string, employee_id: string): Promise<any> {
        try {
            const body = { list_id, employee_id };
            return await axiosInstance().delete(`/list/employee`, { data: body });
        } catch (error) {
            return handleError(error, { message: 'Échec de la suppression de l\'employé de la liste', logError: true });
        }
    },
};
