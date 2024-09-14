// stores/useAccountStore.ts
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { axiosInstance } from "@/services/AxiosService";

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
  },

  actions: {
    me() {
      return new Promise((resolve, reject) => {
        axiosInstance()
          .get("/account/me")
          .then((response) => {
            this.setAccount(response.data.personal_data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setAccount(account: User) {
      this.account = account;
    },
  },
});
