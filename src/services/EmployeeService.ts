import type { Employee } from '@/types/employee';
import { handleError } from '@/utils/ErrorHandler';
import { axiosInstance } from '@/services/AxiosService';

export default {
    /**
     * Import employees from a csv file
     * @param file The file to import
    */
    async importEmployees(file: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            return await axiosInstance().post('/employee/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            return handleError(error, { message: 'Échec de l\'importation des employés', logError: true });
        }
    },

    /**
     * Get all employees
     */
    async getAllEmployees(): Promise<any> {
        try {
            return await axiosInstance().get('/employee');
        } catch (error) {
            return handleError(error, { message: 'Échec de la récupération des employés', logError: true });
        }
    },

    /**
     * Update an employee
     * @param employee The employee to update
     */
    async updateEmployee(employee: Employee): Promise<any> {
        try {
            return await axiosInstance().patch('/employee', employee);
        } catch (error) {
            return handleError(error, { message: 'Échec de la mise à jour de l\'employé', logError: true });
        }
    },

    /**
     * Delete an employee
     * @param employeeIds The ids of the employees to delete
     */
    async deleteEmployee(employeeIds: string[]): Promise<any> {
        try {
            const body = { id: employeeIds };
            return await axiosInstance().delete('/employee', { data: body });
        } catch (error) {
            return handleError(error, { message: 'Échec de la suppression de l\'employé', logError: true });
        }
    },

    /**
     * Search for an employee
     * @param value The search value
     */
    async searchEmployee(value: string): Promise<any> {
        try {
            return await axiosInstance().get(`/employee/search?name=${value}`);
        } catch (error) {
            return handleError(error, { message: 'Échec de la recherche de l\'employé', logError: true });
        }
    }
};
