// stores/useUsersStore.ts
import { defineStore } from 'pinia'
import type { Employee } from '@/types/employee'
import {axiosInstance} from "@/services/AxiosService";

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
    async importEmployees(file: File){
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        axiosInstance().post('/employee/import', formData ,{
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    async getAllEmployees() {
      return new Promise((resolve, reject) => {
        axiosInstance().get('/employee')
        .then(response => {
          this.employeeList = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    async updateEmployee() {
      const employee = this.selectedEmployee

      return new Promise((resolve, reject) => {
        axiosInstance().patch(`/employee`, employee)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    async deleteEmployee(employeeIds: string[]) {
      const body= {'id': employeeIds}

      return new Promise((resolve, reject) => {
        axiosInstance().delete(`/employee`, { data: body })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    searchEmployee(value: string) {
      return new Promise((resolve, reject) => {
        axiosInstance().get(`/employee/search?name=${value}`)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
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
