import { useErrorStore } from '@/stores/errorStore';
import { useToastService }  from '@/services/ToastService';


interface ErrorOptions {
  message?: string;
  logError?: boolean;
}

export function handleError(error: any, options: ErrorOptions = {}) {
  const errorStore = useErrorStore();
  const { showToast } = useToastService();

  if (options.logError) {
    console.error(error);
  }

  const errorMessage = options.message || error.message || 'Une erreur inconnue est survenue';
  errorStore.addError({ message: errorMessage });

  showToast({
      severity: "error",
      summary: "Erreur",
      detail: errorMessage,
      life: 3000,
    });

  return error;
}