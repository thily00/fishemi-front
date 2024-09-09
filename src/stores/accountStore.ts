// stores/useAccountStore.ts
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import axiosRequest from "@/router/requestInterceptor";

interface AccountStore {
  account: User | null;
  isConnected: boolean;
}

export const useAccountStore = defineStore("account", {
  state: (): AccountStore => ({
    account: null,
    isConnected: localStorage.getItem("accessToken") ? true : false,
  }),

  getters: {
    getUserInfos(state) {
      return state.account;
    },
  },

  actions: {
    // This function is used to send an OTP to the user's email
    async sendOtp(email: string) {
      return new Promise((resolve, reject) => {
        axiosRequest
          .get(`/account/sendOtp?email=${email}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // This function is used to register a user
    async signup({
      email,
      user_full_name,
      company_name,
    }: {
      email: string;
      user_full_name: string;
      company_name: string;
    }) {
      return new Promise((resolve, reject) => {
        axiosRequest
          .post("/account/signup", {
            email: email,
            user_full_name: user_full_name,
            company_name: company_name,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // This function is used to login a user
    async login({ email, otpCode }: { email: string; otpCode: string }) {
      return new Promise((resolve, reject) => {
        axiosRequest
          .get(`/account/login?email=${email}&otp-code=${otpCode}`)
          .then((response) => {
            if (response.data) {
              const accessToken = response.data.access_token;
              const refreshToken = response.data.refresh_token;
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
              this.isConnected = true;
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // This function is used to get the user's information
    async getUserInfo() {
      return new Promise((resolve, reject) => {
        axiosRequest
          .get("/account/me")
          .then((response) => {
            if (response.data) {
              this.account = response.data.personal_data;
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // This function is used to logout a user
    async logout() {
      return new Promise((resolve) => {
        localStorage.clear();
        this.isConnected = false;

        // window.location.href = "/login";

        resolve("User logged out");
      });
    },
  },
});
