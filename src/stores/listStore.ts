import { defineStore } from "pinia";
import type { List } from "@/types/list";
import ListService from "@/services/ListService";

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
      return await ListService.createList(name);
    },

    async getAllLists() {
      const lists = await ListService.getAllLists();
      this.lists = lists;
    },

    async updateList(list: List) {
      return await ListService.updateList(list);
    },

    async deleteList(listIds: string[]) {
      return await ListService.deleteList(listIds);
    },

    async searchList(name: string) {
      // return await ListService.searchList(name);

      const response = await ListService.searchList(name);
      this.lists = response.data;
    },

    async addEmployeeToList(list_id: string, employee_id: string) {
      return await ListService.addEmployeeToList(list_id, employee_id);
    },

    async removeEmployee(list_id: string, employee_id: string) {
      return await ListService.removeEmployee(list_id, employee_id);
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
