// stores/useUsersStore.ts
import axios from 'axios'
import { defineStore } from 'pinia'
import type { Employee } from '@/types/employee'

interface EmployeeStore {
  employeeList: Employee[]
  selectedEmployee: Employee | null
}

export const useEmployeeStore = defineStore('employee', {
  state: (): EmployeeStore => ({
    employeeList: [],
    selectedEmployee: null
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
        const accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://preprod.api.fishemi.ilies.ch/employee/import', formData ,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
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
        const accessToken = localStorage.getItem('accessToken');
        axios.get('https://preprod.api.fishemi.ilies.ch/employee', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
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
        const accessToken = localStorage.getItem('accessToken');
        axios.patch(`https://preprod.api.fishemi.ilies.ch/employee`, employee, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
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


    async deleteEmployee(employeeIds: string[]) {      
      const body= {'id': employeeIds}
    
      return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.delete(`https://preprod.api.fishemi.ilies.ch/employee`, {
          data: body,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
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

    setSelectedEmployee(employeeId: string) {        
        const employee = this.getUserById(employeeId)
        if (employee) {
            this.selectedEmployee = employee
        }
    }
  },
})
