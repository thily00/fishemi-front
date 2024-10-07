import { defineStore } from "pinia";
import type { User } from "@/types/user";
import userService from "@/services/UserService";

interface AccountStore {
  account: User | null;
}

export const useAccountStore = defineStore("account", {
  state: (): AccountStore => ({
    account: null,
  }),

  getters: {
    getUserInfos(state) {
      return state.account;
    },

    isAdmin: (state) => state.account?.role === "Administrateur",
    isEditor: (state) => state.account?.role === "Éditeur",
    isReader: (state) => state.account?.role === "Lecteur"
  },

  actions: {
    async me() {
      const response = await userService.getuserInfo()
      this.setAccount(response.personal_data);
      return response;
    },

    setAccount(account: User) {
      this.account = account;
    },
  },
});
