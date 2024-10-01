// stores/useListStore.ts
import { defineStore } from "pinia";
import type { List } from "@/types/list";
import { axiosInstance } from "@/services/AxiosService";

interface ListStore {
  lists: List[];
  selectedList: List | null;
  selectedLists: string[];
}

export const useListStore = defineStore("liste", {
  state: (): ListStore => ({
    lists: [],
    selectedList: null,
    selectedLists: [],
  }),

  getters: {
    getAll: (state) => {
      return state.lists;
    },
    getListById:
      (state) =>
      (id: string): List | undefined => {
        return state.lists.find((list) => list.id === id);
      },
  },

  actions: {
    async createList(name: string) {
      const body = { name: name };

      return new Promise((resolve, reject) => {
        axiosInstance()
          .post("/list", body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async getAllLists() {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .get("/list")
          .then((response) => {
            this.lists = response.data;

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async updateList(list: List) {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .patch(`/list`, list)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async deleteList(listIds: string[]) {
      return Promise.all(
        listIds.map((listId) => {
          return new Promise((resolve, reject) => {
            axiosInstance()
              .delete(`/list/?id=${listId}`)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
      )
        .then(() => {
          return "success";
        })
        .catch((error) => {
          throw error;
        });
    },

    async searchList(name: string) {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .get(`/list/search?name=${name}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async addEmployeeToList(list_id: string, employee_id: string) {
      const body = { list_id: list_id, employee_id: employee_id };

      return new Promise((resolve, reject) => {
        axiosInstance()
          .post("/list/employee", body)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async removeEmployee(list_id: string, employee_id: string) {
      const body = { list_id: list_id, employee_id: employee_id };

      return new Promise((resolve, reject) => {
        axiosInstance()
          .delete(`/list/employee`, { data: body })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setSelectedList(getListById: string) {
      const list = this.getListById(getListById);
      if (list) {
        this.selectedList = list;
      }
    },

    setSelectionList(listIds: string[]) {
      this.selectedLists = listIds;
    },
  },
});
