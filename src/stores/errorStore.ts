import { defineStore } from 'pinia';

interface Error {
  message: string;
}

interface ErrorStore {
  errors: Error[];
}

export const useErrorStore = defineStore('error', {
  state: (): ErrorStore => ({
    errors: [],
  }),

  actions: {
    addError(error: Error) {
      this.errors.push(error);
    },
    clearErrors() {
      this.errors = [];
    },
  },
});
