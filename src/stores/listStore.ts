// stores/useListStore.ts
import axios from 'axios'
import { defineStore } from 'pinia'
import type { List } from '@/types/list'

interface ListStore {
  lists: List[]
  selectedList: List | null
  selectedLists: string[]
}

export const useListStore = defineStore('liste', {
  state: (): ListStore => ({
    lists: [],
    selectedList: null,
    selectedLists: []
  }),

  getters: {
    getAll: (state) => {
        return state.lists
    },
    getListById: (state) => (id: string): List | undefined => {
      return state.lists.find(list => list.id === id)
    }
  },

  actions: {
    async createList(name: string){
      return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        const body = { 
          name: name
        }
        axios.post('https://preprod.api.fishemi.ilies.ch/list', body ,{
          headers: {
            'Content-Type': 'application/json',
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

    async getAllLists() {
      return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get('https://preprod.api.fishemi.ilies.ch/list', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.lists = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    async addEmployeeToList(list_id:string, employee_id:string) {
      return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        const body = {
          list_id: list_id,
          employee_id: employee_id
        }
        axios.post('https://preprod.api.fishemi.ilies.ch/list/employee', body ,{
          headers: {
            'Content-Type': 'application/json',
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
    // async updateEmployee() {
    //   const employee = this.selectedEmployee

    //   return new Promise((resolve, reject) => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     axios.patch(`https://preprod.api.fishemi.ilies.ch/employee`, employee, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`,
    //       }
    //     })
    //     .then(response => {   
    //       resolve(response)
    //     })
    //     .catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // async deleteEmployee(employeeIds: string[]) {      
    //   const body= {'id': employeeIds}
    
    //   return new Promise((resolve, reject) => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     axios.delete(`https://preprod.api.fishemi.ilies.ch/employee`, {
    //       data: body,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`,
    //       }
    //     })
    //     .then(response => {
    //       resolve(response)
    //     })
    //     .catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // searchEmployee(value: string) {
    //   return new Promise((resolve, reject) => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     axios.get(`https://preprod.api.fishemi.ilies.ch/employee/search?name=${value}`, {
    //       headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //       }
    //     })
    //     .then(response => {
    //       resolve(response)
    //     })
    //     .catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    setSelectedList(getListById: string) {        
        const list = this.getListById(getListById)
        if (list) {
            this.selectedList = list
        }
    },

    setSelectionList(listIds: string[]) {
      this.selectedLists = listIds
    }
  }
})
