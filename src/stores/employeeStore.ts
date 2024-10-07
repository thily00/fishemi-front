import { defineStore } from 'pinia'
import type { Employee } from '@/types/employee'
import EmployeeService from '@/services/EmployeeService';

interface EmployeeStore {
  employeeList: Employee[]
  selectedEmployee: Employee | null
  selectedEmployees: string[]
}

export const useEmployeeStore = defineStore('employee', {
  state: (): EmployeeStore => ({
    employeeList: [],
    selectedEmployee: null,
    selectedEmployees: []
  }),

  getters: {
    getAll: (state) => {
        return state.employeeList
    },
    getUserById: (state) => (id: string): Employee | undefined => {
      return state.employeeList.find(employee => employee.id === id)
    },
  },

  actions: {
    async importEmployees(file: File): Promise<void> {
      return await EmployeeService.importEmployees(file)
    },

    async getAllEmployees() {
      const response = await EmployeeService.getAllEmployees();
      this.employeeList = response.data;
    },

    async updateEmployee() {
      if (this.selectedEmployee) {
        return await EmployeeService.updateEmployee(this.selectedEmployee);
      }
    },

    async deleteEmployee(employeeIds: string[]) {
      return await EmployeeService.deleteEmployee(employeeIds);
    },

    async searchEmployee(value: string) {
      const response = await EmployeeService.searchEmployee(value);
      this.employeeList = response.data;
    },

    setSelectedEmployee(employeeId: string) {
        const employee = this.getUserById(employeeId)
        if (employee) {
            this.selectedEmployee = employee
        }
    },

    setSelectionList(employeeIds: string[]) {
      this.selectedEmployees = employeeIds
    }
  }
})
